from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# note: avoiding naming the class as Child to avoid unexpected behavior
class Student(models.Model):
    GENDER_CHOICES = [
        ('B', 'Boy'),
        ('G', 'Girl'),
        ('O', 'Other'),
    ]

    name = models.CharField(max_length=100)
    year_group = models.CharField(max_length=50)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    def __str__(self):
        return f"{self.name} ({self.year_group})"

class Group(models.Model):
    name = models.CharField(max_length=100, unique=True)
    students = models.ManyToManyField('Student', related_name='groups')

    def __str__(self):
        return self.name

    def student_count(self):
        """Returns the number of students in the group."""
        return self.students.count()

class TeacherManager(BaseUserManager):
    def create_teacher(self, email, name, password=None):
        if not email:
            raise ValueError("Teachers must have an email address")
        email = self.normalize_email(email)
        teacher = self.model(email=email, name=name)
        teacher.set_password(password)
        teacher.save(using=self._db)
        return teacher

class Teacher(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    groups = models.ManyToManyField('Group', related_name='teachers')

    objects = TeacherManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name
