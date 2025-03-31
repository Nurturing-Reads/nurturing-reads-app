# books/urls.py
from django.urls import path
from .views import get_book, get_book_list, get_audio, \
	get_book_progress, set_book_progress, get_book_cover_image, \
	get_book_background_image, get_book_progress_template

urlpatterns = [
    path('book/<str:book_id>', get_book, name='get_book'),
    path('book_list/', get_book_list, name='get_book_list'),
    path('book_cover/<str:book_id>', get_book_cover_image, name='get_book_cover'),
    path('book_background/<str:book_id>/<int:section_number>/', get_book_background_image, name='get_book_background_image'),
    path('audio/<str:book_id>/section_<int:section_number>/question_<int:question_number>/choice_<int:choice_number>/', get_audio, name='get_audio'),
    path('book_progress_template/<str:book_id>/', get_book_progress_template, name='get_book_progress_template'),
    path('book_progress/<str:book_id>/<str:user_id>/', get_book_progress, name='get_book_progress'),
    path('book_progress/<str:book_id>/<str:user_id>/set/', set_book_progress, name='set_book_progress'),
]
