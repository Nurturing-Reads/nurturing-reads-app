from django.contrib import admin
from nurturingread.admin import custom_admin
from django.contrib.admin import AdminSite
from .models import Student, Group, Teacher


class MyAdmin(admin.ModelAdmin):
	change_form_template = 'books/change_form.html'

# Register your models here.
custom_admin.register(Student, MyAdmin)
custom_admin.register(Group, MyAdmin)
custom_admin.register(Teacher, MyAdmin)


# ~ admin.site.register(Student)
# ~ admin.site.register(Group)
# ~ admin.site.register(Teacher)
