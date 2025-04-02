import os
import json
from pathlib import Path
import shutil

from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.files import File

from reading_app.models import Audio

def get_audio_filename(audio_filepath):
	filename = os.path.basename(audio_filepath)
	filename = filename[:-4]
	return filename

class Command(BaseCommand):
	help = 'initialise the application system database'
	
	def handle(self, *args, **kwargs):
		# audio for trying to move forward when right answer is not given
		mp3_folder = os.path.join(settings.SYSTEM_FILE_PATH_FIELD_DIRECTORY, 'message_for_attempt_before_next_section')
		for root, _, files in os.walk(mp3_folder):
			for file in files:
				if file.endswith('.mp3'):
					file_path = os.path.join(root, file)
					title = get_audio_filename(file)
					Audio.objects.create(
						audio_class='message_for_attempt_before_next_section',
						title=title,
						file_path=file_path
					)
					
		# image for question page and end of story page
		question_folder = os.path.join(settings.SYSTEM_FILE_PATH_FIELD_DIRECTORY, 'question_image')
		target_question_folder = os.path.join(settings.MEDIA_ROOT, 'images')
		if not os.path.isdir(target_question_folder):
			os.makedirs(target_question_folder)
		for root, _, files in os.walk(question_folder):
			for file in files:
				if file.endswith('.png'):
					file_path = os.path.join(root, file)
					target_path = os.path.join(target_question_folder, file)
					shutil.copy(file_path, target_path)

		finish_folder = os.path.join(settings.SYSTEM_FILE_PATH_FIELD_DIRECTORY, 'finish_image')
		target_question_folder = os.path.join(settings.MEDIA_ROOT, 'images')
		for root, _, files in os.walk(finish_folder):
			for file in files:
				if file.endswith('.png'):
					file_path = os.path.join(root, file)
					target_path = os.path.join(target_question_folder, file)
					shutil.copy(file_path, target_path)
		
		# image for temp files for card grids
		question_folder = os.path.join(settings.SYSTEM_FILE_PATH_FIELD_DIRECTORY, 'temp_covers_gray')
		target_question_folder = os.path.join(settings.MEDIA_ROOT, 'images')
		if not os.path.isdir(target_question_folder):
			os.makedirs(target_question_folder)
		for root, _, files in os.walk(question_folder):
			for file in files:
				if file.endswith('.png'):
					file_path = os.path.join(root, file)
					target_path = os.path.join(target_question_folder, file)
					shutil.copy(file_path, target_path)
