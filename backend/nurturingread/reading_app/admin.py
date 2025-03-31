# ~ from django.contrib import admin
from nurturingread.admin import custom_admin
from .models import Audio

custom_admin.register(Audio)
