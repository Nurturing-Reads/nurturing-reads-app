from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Student, Group, Teacher
from .serializers import StudentSerializer, GroupSerializer, TeacherSerializer

########################## STUDENTS ################################

# Create a new student
@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all students
@api_view(['GET'])
def get_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

# Get a single student by ID
@api_view(['GET'])
def get_student(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

# Update student information
@api_view(['PUT'])
def update_student(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        serializer = StudentSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

# Delete a student
@api_view(['DELETE'])
def delete_student(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        student.delete()
        return Response({'message': 'Student deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)


############################ GROUP #####################################

# Create a new group
@api_view(['POST'])
def create_group(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all groups
@api_view(['GET'])
def get_groups(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data)

# Get a single group by ID
@api_view(['GET'])
def get_group(request, group_id):
    try:
        group = Group.objects.get(id=group_id)
        serializer = GroupSerializer(group)
        return Response(serializer.data)
    except Group.DoesNotExist:
        return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

# Update a group
@api_view(['PUT'])
def update_group(request, group_id):
    try:
        group = Group.objects.get(id=group_id)
        serializer = GroupSerializer(group, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Group.DoesNotExist:
        return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

# Delete a group
@api_view(['DELETE'])
def delete_group(request, group_id):
    try:
        group = Group.objects.get(id=group_id)
        group.delete()
        return Response({'message': 'Group deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Group.DoesNotExist:
        return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)
        

#################### TEACHER ####################################

# Create a new teacher
@api_view(['POST'])
def create_teacher(request):
    serializer = TeacherSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all teachers
@api_view(['GET'])
def get_teachers(request):
    teachers = Teacher.objects.all()
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)

# Get a single teacher by ID
@api_view(['GET'])
def get_teacher(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id=teacher_id)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)
    except Teacher.DoesNotExist:
        return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

# Update a teacher
@api_view(['PUT'])
def update_teacher(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id=teacher_id)
        serializer = TeacherSerializer(teacher, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Teacher.DoesNotExist:
        return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

# Delete a teacher
@api_view(['DELETE'])
def delete_teacher(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id=teacher_id)
        teacher.delete()
        return Response({'message': 'Teacher deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Teacher.DoesNotExist:
        return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
