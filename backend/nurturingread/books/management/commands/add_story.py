import os
import json
from pathlib import Path
import numpy as np
from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.files import File

from books.models import Book, Audio, BackgroundImage


def get_audio_filename(audio_filepath):
	filename = os.path.basename(audio_filepath)
	filename = filename[:-4]
	return filename
	
def find_section_background_files(img_dir):
	output = []
	for root, _, files in os.walk(img_dir):
		for file in files:
			title = get_audio_filename(file)
			if file.endswith('.jpg') and title.startswith('section'):
				file_path = os.path.join(root, file)
				output.append(file_path)
	return np.sort(output)

class Command(BaseCommand):
	help = 'add story to database'
    
	def add_arguments(self, parser):
		parser.add_argument('book_id', nargs='?', type=str)

	def handle(self, *args, **kwargs):
		book_list = []
		if kwargs['book_id'] is not None:
			book_folder = os.path.join(settings.FILE_PATH_FIELD_DIRECTORY, kwargs['book_id'])
			if not os.path.isdir(book_folder):
				print('story not found: ' + kwargs['book_id'])
				return
			else:
				book_list.append(kwargs['book_id'])
		# if book_id not given, then add all books
		else:
			book_list = [ item for item in os.listdir(settings.FILE_PATH_FIELD_DIRECTORY) if os.path.isdir(os.path.join(settings.FILE_PATH_FIELD_DIRECTORY, item)) ]

		# create Book
		for book_id in book_list:
			book_folder = os.path.join(settings.FILE_PATH_FIELD_DIRECTORY, book_id)
			book_file = os.path.join(book_folder, 'story_section_question_clean.json')
			with open(book_file, 'r') as openfile:
				story = json.load(openfile)
			
			image_dir = os.path.join(book_folder, 'image')
			cover_image_file = os.path.join(image_dir, 'story_cover.jpg')		
			with open(cover_image_file, 'rb') as f:
				cover_image = File(file=f, name=book_id+Path(cover_image_file).name)
				my_book = Book.objects.create(
							book_id=book_folder,
							title=story['title'],
							summary=story['summary'],
							json_data=story,
							cover_image=cover_image
						)
			
			# create background image
			section_img_list = 	find_section_background_files(image_dir)
			for idx in range(len(section_img_list)):
				section_img_file = section_img_list[idx]
				with open(section_img_file, 'rb') as f:
					section_img = File(file=f, name=book_id+Path(section_img_file).name)
					BackgroundImage.objects.create(
							book=my_book,
							section_number=idx,
							image=section_img
						)
			
			# create audios
			mp3_folder = os.path.join(book_folder, 'audio')
			for root, _, files in os.walk(mp3_folder):
				for file in files:
					if file.endswith('.mp3'):
						file_path = os.path.join(root, file)
						title = get_audio_filename(file)
						Audio.objects.create(
							book=my_book,
							title=title,
							file_path=file_path
						)
