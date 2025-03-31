# books/urls.py
from django.urls import path
from .views import get_answer_before_next_audio

urlpatterns = [
    path('audio/answer_before_next', get_answer_before_next_audio, name='get_answer_before_next_audio'),
]
