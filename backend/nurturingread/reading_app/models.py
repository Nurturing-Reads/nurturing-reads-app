from django.db import models
from django.conf import settings

# audios for the book, should be placed in /audio subfolder	
class Audio(models.Model):
	audio_class = models.CharField(max_length=100)
	title = models.CharField(max_length=100)
	file_path = models.FilePathField(path=settings.FILE_PATH_FIELD_DIRECTORY)

	def __str__(self):
		return self.audio_class + ' ' + self.title
