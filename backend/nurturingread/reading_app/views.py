from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, FileResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Audio

@api_view(['GET'])
def get_answer_before_next_audio(request):
    audio = Audio.objects.order_by('?').first()  # Get a random audio
    if audio:
        return FileResponse(open(audio.file_path, 'rb'), content_type='audio/mpeg')
    else:
        return Response({'error': 'No audio available'}, status=404)
