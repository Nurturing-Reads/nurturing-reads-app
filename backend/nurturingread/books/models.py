from django.db import models
from django.conf import settings
from user.models import Student

class Book(models.Model):
	book_id = models.CharField(max_length=50)	# pre-defined ID, not ID in database
	title = models.CharField(max_length=200)
	summary = models.TextField()
	json_data = models.JSONField()
	cover_image = models.ImageField(upload_to='images/')
	
	def __str__(self):
		return self.book_id  + ' ' + self.title
	
# audios for the book, should be placed in /audio subfolder	
class Audio(models.Model):
	book = models.ForeignKey(Book, on_delete=models.CASCADE)
	title = models.CharField(max_length=100)
	file_path = models.FilePathField(path=settings.FILE_PATH_FIELD_DIRECTORY)

	def __str__(self):
		return self.book.book_id + ' ' + self.title

# background image for the book
class BackgroundImage(models.Model):
	book = models.ForeignKey(Book, on_delete=models.CASCADE)
	section_number = models.IntegerField()
	image = models.ImageField(upload_to='images/')
	
	def __str__(self):
		return self.book.book_id + ' ' + str(self.section_number)

# TODO: check if it is better to move this to view
def create_choice_record(book):
	book_json = book.json_data
	output = {'sections':[]}
	for section in book_json['sections']:
		section_output = {'questions':[]}
		for question in section['questions']:
			question_output = {'options':[]}
			for idx in range(len(question['options'])):
				question_output['options'].append(False)
			section_output['questions'].append(question_output)
		output['sections'].append(section_output)
	# ~ print('reset')
	return output

# this models user's progress for a book
class BookProgress(models.Model):
	book = models.ForeignKey(Book, on_delete=models.CASCADE)
	user = models.ForeignKey(Student, on_delete=models.CASCADE)
	choice_record = models.JSONField()
	
	# TODO it is no longer necessary to intialise template here
	def save(self, *args, **kwargs):
		if self.choice_record == None:
			self.choice_record = create_choice_record(self.book)
		super(BookProgress, self).save(*args, **kwargs)
	
	def __str__(self):
		return self.book.book_id + '_' + self.book.book_id + '_progress'
