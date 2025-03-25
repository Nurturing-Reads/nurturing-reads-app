from rest_framework import serializers
from .models import Student, Group, Teacher

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), many=True
    )

    class Meta:
        model = Group
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Teacher
        fields = ['id', 'email', 'name', 'password', 'groups']

    def create(self, validated_data):
        """Hash password before saving."""
        password = validated_data.pop('password')
        teacher = Teacher.objects.create_teacher(**validated_data)
        teacher.set_password(password)
        teacher.save()
        return teacher
