DEL db.sqlite3
SET curr_directory=%CD%
rd /s /q %curr_directory%\reading_app\migrations
rd /s /q %curr_directory%\books\migrations
rd /s /q %curr_directory%\user\migrations
rd /s /q %curr_directory%\media
python manage.py makemigrations reading_app
python manage.py makemigrations books
python manage.py makemigrations user
python manage.py migrate
python manage.py createsuperuser --username yanhw --email abc@abc.com --noinput
python manage.py initialise_app
python manage.py add_story 
python manage.py init_test_user
