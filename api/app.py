import time
from flask import Flask

app = Flask(__name__)


@app.route('/hello')
def get_welcome_message():
    return {'message': 'Welcome to MBTI!'}