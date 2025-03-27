# Backend for nurturing read app

## setup environment

1. install python (Python 3.12.9)
2. navigate to the folder with this README.
3. creating the virtual environment `python -m venv backend_env`
4. activate the virtual environment `backend_env` (the exact command is OS dependent)
5. install dependencies with requirement.txt `pip install -r requirements.txt`
6. `cd nurturingread`
7. initialise database by running `python manage.py makemigrations` and `python manage.py migrate`. This should create `db.sqlite3`

## to start backend server
1. activate virtual environment `backend_env`
2. run `python manage.py runserver`

## to remove all existing entries and restart with clean database
1. stop any running server
2. delete `db.sqlite3`
3. run `python manage.py makemigrations` and `python manage.py migrate`
4. run `python manage.py runserver` to restart the server

## Note:
1. Using Django REST Framework to create API
2. To avoid accidentaly trigger reserved keywords in different programming languages, I am using "student" instead of "child" and "group" instead of "class"
3. For now, `group` only accepts `student`s that are already created. This means when submitting the request to create `group`, need to submit a sequence of requests to create `student` first, then create the group with student ID. It might be good to streamline this.
4. All Django commands should be executed in the folder `nurturing-reads-app\backend\nurturingread`

## TODO
1. give each student a unique ID
2. store user password
1. can `group` has multiple `teacher`?
  - Yes, we can?