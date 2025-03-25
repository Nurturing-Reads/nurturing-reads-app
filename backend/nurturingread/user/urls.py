from django.urls import path
from .views import create_student, get_students, get_student, \
    update_student, delete_student, create_group, get_groups, \
    get_group, update_group, delete_group, create_teacher, \
    get_teachers, get_teacher, update_teacher, delete_teacher

urlpatterns = [
    path('students/', get_students, name='get_students'),         # Get all students
    path('students/create/', create_student, name='create_student'),  # Create a student
    path('students/<int:student_id>/', get_student, name='get_student'),  # Get a single student
    path('students/<int:student_id>/update/', update_student, name='update_student'),  # Update a student
    path('students/<int:student_id>/delete/', delete_student, name='delete_student'),  # Delete a student
    path('groups/', get_groups, name='get_groups'),
    path('groups/create/', create_group, name='create_group'),
    path('groups/<int:group_id>/', get_group, name='get_group'),
    path('groups/<int:group_id>/update/', update_group, name='update_group'),
    path('groups/<int:group_id>/delete/', delete_group, name='delete_group'),
    path('teachers/', get_teachers, name='get_teachers'),
    path('teachers/create/', create_teacher, name='create_teacher'),
    path('teachers/<int:teacher_id>/', get_teacher, name='get_teacher'),
    path('teachers/<int:teacher_id>/update/', update_teacher, name='update_teacher'),
    path('teachers/<int:teacher_id>/delete/', delete_teacher, name='delete_teacher'),
]
