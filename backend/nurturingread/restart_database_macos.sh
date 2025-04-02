#!/bin/bash
# Remove SQLite database
rm -f db.sqlite3

# Get current directory
curr_directory=$(pwd)

# Remove migration folders and media
rm -rf "$curr_directory/reading_app/migrations"
rm -rf "$curr_directory/books/migrations"
rm -rf "$curr_directory/user/migrations"
rm -rf "$curr_directory/media"

# Run Django management commands
python manage.py makemigrations reading_app
python manage.py makemigrations books
python manage.py makemigrations user
python manage.py migrate
python manage.py createsuperuser --username yanhw --email abc@abc.com --noinput
python manage.py initialise_app
python manage.py add_story
python manage.py init_test_user
