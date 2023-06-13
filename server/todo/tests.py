from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.authtoken.models import Token
import random

USER1_USERNAME = 'Tester1'
USER1_PASSWORD = '123456789'

USER2_USERNAME = 'Tester2'
USER2_PASSWORD = '123456789'

class ProjectTest(TestCase):
    def setUp(self):
        # Authorized clients
        self.user1 = User.objects.create(username=USER1_USERNAME, password=USER1_PASSWORD)
        self.user2 = User.objects.create(username=USER2_USERNAME, password=USER2_PASSWORD)

        # Client with projects
        self.client_with_projects = APIClient()
        self.client_with_projects.force_authenticate(user=self.user1)

        # Client without projects
        self.client_without_projects = APIClient()
        self.client_without_projects.force_authenticate(user=self.user2)

        # Unauthorized client
        self.client_without_token = APIClient()

        # User creates project 1 and project 2
        Project.objects.create(user_id=self.user1,title="Project 1", text="My text 1")
        Project.objects.create(user_id=self.user1,title="Project 2", text="My text 2")

        self.project = {
            "title": "test project",
            "text": "test text project"
        }

    def test_get_created_projects(self):
        response = self.client_with_projects.get(reverse('projects'))
        projects = Project.objects.filter(user_id = self.user1)
        serializer = ProjectSerializer(projects, many=True)

        self.assertEqual(response.data.get('projects'), serializer.data)

    def test_get_empty_projects(self):
        response = self.client_without_projects.get(reverse('projects'))

        self.assertEqual(response.data.get('projects'), [])

    def test_get_projects_unauthorized(self):
        response = self.client_without_token.get(reverse('projects'))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_created_project(self):
        projects = Project.objects.filter(user_id=self.user1)
        random_project = projects[random.randint(0, len(projects) - 1)]
        response = self.client_with_projects.get(reverse('project', kwargs={ "pk": random_project.id }))
        serializer = ProjectSerializer(random_project)

        self.assertEqual(response.data.get('project'), serializer.data)

    def test_get_empty_project(self):
        projects = Project.objects.filter(user_id=self.user1)
        random_project = projects[random.randint(0, len(projects) - 1)]
        response = self.client_without_projects.get(reverse('project', kwargs={ "pk": random_project.id }))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_project_unauthorized(self):
        projects = Project.objects.filter(user_id=self.user1)
        random_project = projects[random.randint(0, len(projects) - 1)]
        response = self.client_without_projects.get(reverse('project', kwargs={ "pk": random_project.id }))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_update_delete_project(self):

        # create
        post_response = self.client_with_projects.post(reverse('projects'), data=self.project)
        self.assertEquals(post_response.status_code, status.HTTP_200_OK)

        # get
        get_response = self.client_with_projects.get(reverse('project', kwargs = { "pk": post_response.data.get('project').get('id') }))
        self.assertEquals(get_response.data.get('project'), post_response.data.get('project'))

        # update
        self.project['text'] = 'test'
        update_response = self.client_with_projects.patch(reverse('project', kwargs = { "pk": post_response.data.get('project').get('id') }), data=self.project)
        self.assertEquals(update_response.data.get('project').get('title'), self.project['title'])
        self.assertEquals(update_response.data.get('project').get('text'), self.project['text'])

        # delete
        delete_reponse = self.client_with_projects.delete(reverse('project', kwargs = { "pk": post_response.data.get('project').get('id') }))
        self.assertEquals(delete_reponse.data.get('project'), update_response.get('project'))

        # get
        get_response = self.client_with_projects.get(reverse('project', kwargs = { "pk": post_response.data.get('project').get('id') }))
        self.assertEquals(get_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_invalid_update_delete(self):
        projects = Project.objects.filter(user_id=self.user1)
        random_project = projects[random.randint(0, len(projects) - 1)]
        update_response = self.client_without_projects.patch(reverse('project', kwargs = { "pk": random_project.id }), data=self.project)
        self.assertEqual(update_response.status_code, status.HTTP_401_UNAUTHORIZED)

        update_response = self.client_without_projects.delete(reverse('project', kwargs = { "pk": random_project.id }), data=self.project)
        self.assertEqual(update_response.status_code, status.HTTP_401_UNAUTHORIZED)

    



    