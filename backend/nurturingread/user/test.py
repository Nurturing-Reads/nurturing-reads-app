from django.test import TestCase
from .models import Student, Group, Teacher
from django.core.exceptions import ValidationError

class StudentModelTest(TestCase):

    def setUp(self):
        """Set up a sample student for testing."""
        self.student = Student.objects.create(
            name="Alice Smith",
            year_group="Year 10",
            gender="G"
        )

    def test_student_creation(self):
        """Test if a student object is created correctly."""
        student = Student.objects.get(name="Alice Smith")
        self.assertEqual(student.year_group, "Year 10")
        self.assertEqual(student.gender, "G")

    def test_string_representation(self):
        """Test the __str__ method of the Student model."""
        self.assertEqual(str(self.student), "Alice Smith (Year 10)")

    def test_update_student(self):
        """Test if a student record can be updated."""
        self.student.year_group = "Year 11"
        self.student.save()
        updated_student = Student.objects.get(name="Alice Smith")
        self.assertEqual(updated_student.year_group, "Year 11")

    def test_delete_student(self):
        """Test if a student record can be deleted."""
        student_id = self.student.id
        self.student.delete()
        with self.assertRaises(Student.DoesNotExist):
            Student.objects.get(id=student_id)

    def test_gender_choices(self):
        """Test that gender choices are restricted to allowed values."""
        invalid_student = Student(name="John Doe", year_group="Year 9", gender="X")
        with self.assertRaises(ValidationError):
            invalid_student.full_clean()  # Triggers validation


class GroupModelTest(TestCase):

    def setUp(self):
        """Create students and a group for testing."""
        self.student1 = Student.objects.create(name="Alice", year_group="Year 10", gender="F")
        self.student2 = Student.objects.create(name="Bob", year_group="Year 11", gender="M")

        self.group = Group.objects.create(name="Science Club")
        self.group.students.set([self.student1, self.student2])

    def test_group_creation(self):
        """Test if a group is created correctly."""
        group = Group.objects.get(name="Science Club")
        self.assertEqual(group.student_count(), 2)

    def test_string_representation(self):
        """Test the __str__ method."""
        self.assertEqual(str(self.group), "Science Club")

    def test_add_student_to_group(self):
        """Test adding a student to a group."""
        student3 = Student.objects.create(name="Charlie", year_group="Year 12", gender="M")
        self.group.students.add(student3)
        self.assertEqual(self.group.student_count(), 3)

    def test_remove_student_from_group(self):
        """Test removing a student from a group."""
        self.group.students.remove(self.student1)
        self.assertEqual(self.group.student_count(), 1)

    def test_delete_group(self):
        """Test if a group can be deleted."""
        group_id = self.group.id
        self.group.delete()
        with self.assertRaises(Group.DoesNotExist):
            Group.objects.get(id=group_id)

class TeacherModelTest(TestCase):

    def setUp(self):
        """Create a group and teacher for testing."""
        self.group1 = Group.objects.create(name="Math Club")
        self.group2 = Group.objects.create(name="Science Club")

        self.teacher = Teacher.objects.create_teacher(
            email="teacher@example.com",
            name="John Doe",
            password="securepassword"
        )
        self.teacher.groups.set([self.group1, self.group2])

    def test_teacher_creation(self):
        """Test if a teacher is created correctly."""
        teacher = Teacher.objects.get(email="teacher@example.com")
        self.assertEqual(teacher.name, "John Doe")
        self.assertEqual(teacher.groups.count(), 2)

    def test_string_representation(self):
        """Test the __str__ method."""
        self.assertEqual(str(self.teacher), "John Doe")

    def test_add_group_to_teacher(self):
        """Test adding a group to a teacher."""
        new_group = Group.objects.create(name="History Club")
        self.teacher.groups.add(new_group)
        self.assertEqual(self.teacher.groups.count(), 3)

    def test_remove_group_from_teacher(self):
        """Test removing a group from a teacher."""
        self.teacher.groups.remove(self.group1)
        self.assertEqual(self.teacher.groups.count(), 1)

    def test_delete_teacher(self):
        """Test if a teacher can be deleted."""
        teacher_id = self.teacher.id
        self.teacher.delete()
        with self.assertRaises(Teacher.DoesNotExist):
            Teacher.objects.get(id=teacher_id)
