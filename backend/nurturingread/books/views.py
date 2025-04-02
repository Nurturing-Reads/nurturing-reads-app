import json
from random import randrange

from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, FileResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

from .models import Audio, Book, BookProgress, BackgroundImage, create_choice_record
from user.models import Student

@api_view(['GET'])
def get_book(request, book_id):
	book = Book.objects.get(id=book_id)
	if book:
		data = book.json_data
		return JsonResponse(data)
	else:
		return Response({'error': 'Book not available'}, status=404)


@api_view(['GET'])
def get_book_list(request):
	titles = Book.objects.values_list('title', flat=True)
	summaries = Book.objects.values_list('summary', flat=True)
	ids = Book.objects.values_list('id', flat=True)
	data = {'list':[]}
	for idx in range(len(titles)):
		data['list'].append({'title':titles[idx],'id':ids[idx],'summary':summaries[idx]})
	# ~ data = json.dumps(data)
	return JsonResponse(data)

@api_view(['GET'])
def get_book_cover_image(request, book_id):
	book = get_object_or_404(Book, id=book_id)
	image_path = book.cover_image.path
	with open(image_path, 'rb') as f:
		return HttpResponse(f.read(), content_type='image/jpeg')

@api_view(['GET'])
def get_book_background_image(request, book_id, section_number):
	image = get_object_or_404(BackgroundImage, book_id=book_id, section_number=section_number)
	image_path = image.image.path
	with open(image_path, 'rb') as f:
		return HttpResponse(f.read(), content_type='image/jpeg')


@api_view(['GET'])
def get_audio(request, book_id, section_number, question_number, choice_number):
	audio_title = 'section'+str(section_number).zfill(2)
	if (question_number > 0):
		audio_title += '_question'+str(question_number).zfill(2)
	if (choice_number > 0):
		audio_title += '_choice'+str(choice_number).zfill(2)
		#TODO determine number of responses
		num_response = 2
		response_number = randrange(1,num_response+1)
		audio_title += '_response'+str(response_number).zfill(2)
	print(audio_title)
	audio = get_object_or_404(Audio, book_id=book_id, title=audio_title)
	return FileResponse(open(audio.file_path, 'rb'), content_type='audio/mpeg')


@api_view(['GET'])
def get_book_progress(request, book_id, user_id):
	progress = get_object_or_404(BookProgress, book_id=book_id, user_id=user_id)
	return JsonResponse(progress.choice_record)

@api_view(['GET'])
def get_book_progress_template(request, book_id):
	book = get_object_or_404(Book, id=book_id)
	template = create_choice_record(book)
	return JsonResponse(template)
		

@csrf_exempt
def set_book_progress(request, book_id, user_id):
	if request.method == 'POST':
		data = json.loads(request.body).get('json_data')
		book = get_object_or_404(Book, id=book_id)
		user = get_object_or_404(Student, id=student_id)
		BookProgress.objects.create(
				student=user,
				book=book,
				choice_record=data
		)

		return JsonResponse({'message': 'progress record updated successfully'})
