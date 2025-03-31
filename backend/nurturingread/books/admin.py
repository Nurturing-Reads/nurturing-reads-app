from django.contrib.admin import AdminSite
from django.http import HttpResponse
from django.contrib import admin
from nurturingread.admin import custom_admin
from .models import Book, Audio, BookProgress, BackgroundImage


# ~ admin.site.register(Audio)
# ~ admin.site.register(BookProgress)
# ~ admin.site.register(BackgroundImage)
custom_admin.register(Audio)
custom_admin.register(BookProgress)
custom_admin.register(BackgroundImage)


# ~ from django.urls import re_path
# ~ from django.contrib import admin


#https://stackoverflow.com/questions/35875454/django-admin-extending-admin-with-custom-views
class MyAdmin(admin.ModelAdmin):
	change_form_template = 'books/change_form.html'


# ~ admin.site.register(Book, MyAdmin)
custom_admin.register(Book, MyAdmin)
