# Running the app

The solution I provided uses Javascript/React for frontend and Python/Flask for backend. I also used SQLite file for the database while using SQLAlchemy as the ORM for acessing the database.

## Setting up the backend

Follow the steps below to setup the api:

- Clone the app
- Move to the backend directory. Run the command
  `cd MBTI/api`
- Install requirements. This can be install directly or into a virtual env. If you choose to use virual env, remember to activate it before running the app. Run the command
  `pip install -r requirement.txt`
- Move back to the project base directory

## Setting up the frontend

Simply running `yarn install` at the project base directory will install all frontend required libraries.

## Starting the app

- From the project base directory run the command `yarn start-api`. This should start the api on port `5000` localhost:5000/
- Open another terminal and move to the base directory. Run the command `yarn start`. This should start the frontend app on port `3000`.
- Visit `localhost:3000` to start using the app.

## Note

The frontend is connected to the backend via a proxy so you don't need to worry about the connection but ensure there are no other processes running at port `5000` and `3000`.
