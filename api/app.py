import time
import csv
import json
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(300), unique=True, nullable=False)
    dimension = db.Column(db.String(2), nullable=False)
    direction = db.Column(db.Integer, nullable=False)
    meaning = db.Column(db.String(1), nullable=False)

    def __repr__(self):
        return '<Question %r>' % self.question

    def to_json(self):
        return {
            'question': self.question,
            'dimension': self.dimension,
            'direction': self.direction,
            'question_id': self.id,
            'meaning': self.meaning
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    result = db.relationship('Result', uselist=False, back_populates='user')

    def __repr__(self):
        return '<User %r>' % self.email


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('answers', lazy=True))
    question_id = db.Column(db.Integer,
                            db.ForeignKey('question.id'),
                            nullable=False)
    question = db.relationship('Question',
                               backref=db.backref('answers', lazy=True))

    def __repr__(self):
        return '<Answer %r>' % self.answer


class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ei = db.Column(db.Integer, nullable=False)
    sn = db.Column(db.Integer, nullable=False)
    tf = db.Column(db.Integer, nullable=False)
    jp = db.Column(db.Integer, nullable=False)
    summary = db.Column(db.String(4), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='result')

    def to_json(self):
        return {
            'result_id': self.id,
            'ei': self.ei,
            'sn': self.sn,
            'tf': self.tf,
            'jp': self.jp,
            'summary': self.summary,
            "user": self.user.email
        }

    def __repr__(self):
        return '<Result %r>' % self.id


def write_questions_to_db():
    with open('api/Data/Questions.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count != 0:
                question = Question(question=row[0],
                                    dimension=row[1],
                                    direction=row[2],
                                    meaning=row[3])
                db.session.add(question)
            line_count += 1
        db.session.commit()


def invert_score(num):
    if num == 4:
        return num
    elif num < 4:
        return ((4 - num) * 2) + num
    else:
        pro_value = (num - 4) * 2
        return num - pro_value


@app.route('/questions')
def get_questions():
    questions = db.session.query(Question).all()
    return {'message': [x.to_json() for x in questions]}


@app.route('/answers', methods=['POST'])
def submit_answers():
    data = request.json
    email = data.get('email')
    answers = data.get('answers')
    if not email:
        return jsonify(message='Email is required!'), 404

    num_of_question = db.session.query(Question).count()
    if not answers or len(answers) != num_of_question:
        return jsonify(message='Answers are incomplete'), 400

    user = User(email=email)
    db.session.add(user)
    result = {}
    for answer in answers:
        question = db.session.query(Question).filter_by(
            id=int(answer['question_id'])).first()
        if question:
            score = int(
                answer['answer']) if question.direction > 0 else invert_score(
                    int(answer['answer']))
            if question.dimension in result:
                result[question.dimension].append(score)
            else:
                result[question.dimension] = [score]
            answer_rec = Answer(answer=answer['answer'],
                                question=question,
                                user=user)
            db.session.add(answer_rec)

    dimensions = ['EI', 'SN', 'TF', 'JP']
    summary = ''
    result_score = {}
    for key in dimensions:
        mean = sum(result[key]) / len(result[key])
        if mean > 4:
            result_score[key.lower()] = 1
            summary += key[1]
        else:
            result_score[key.lower()] = 0
            summary += key[0]

    result_rec = Result(**result_score, user=user, summary=summary)
    db.session.add(result_rec)
    db.session.commit()

    return {'result': result_rec.to_json()}


@app.route('/result')
def retrieve_result():
    data = request.json
    email = data.get('email')
    if not email:
        return jsonify(message='Email is required!'), 404

    user = db.session.query(User).filter_by(email=email).first()
    if not user:
        return jsonify(message=f'Result not found for user: {email}'), 404

    return {'result': user.result.to_json()}


if __name__ == '__main__':
    db.drop_all()
    db.create_all()
    write_questions_to_db()
    app.run()