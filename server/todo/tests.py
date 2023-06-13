from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.authtoken.models import Token

# Create your tests here.

class ProjectTest(TestCase):
    def setUp(self):
        # self.token = Token.objects.get(user__username='Alex')
        user = User.objects.create(username="Tester", password="123456789")
        self.client = APIClient()
        self.client.force_authenticate(user=user)

        Project.objects.create(user_id=user,title="Project 1", text="My text 1")
        Project.objects.create(user_id=user,title="Project 2", text="My text 2")

    def test_get_projects(self):
        response = self.client.get(reverse('projects'))
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)

        self.assertEqual(response.data.get('projects'), serializer.data)

    def test_get_project(self):
        response = self.client.get(reverse('project', kwargs={ "pk": 1 }))
        project = Project.objects.get(pk=1)
        serializer = ProjectSerializer(project)

        self.assertEqual(response.data.get('project'), serializer.data)



    