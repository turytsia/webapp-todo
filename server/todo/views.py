from django.shortcuts import render
from django.contrib.auth.models import User
from django.db import IntegrityError

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.views import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Project, ProjectTask, Task
from .serializers import ProjectSerializer, ProjectTaskSerializer, TaskSerializer, UserSerializer

class IndexView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    def get(self, request):
        projects = Project.objects.filter(user_id = request.user)
        serializer = ProjectSerializer(projects, many=True)
        return Response({ "projects": serializer.data })
    
    def post(self, request):
        try:
            title = request.data['title']
            text = request.data['text']
            color = request.data['color']
            deadline = request.data.get('deadline')
        except KeyError:
            return Response({ "message": "Invalid key-value" }, status=status.HTTP_404_NOT_FOUND)
        
        project = Project(user_id=request.user, title=title, text=text, deadline_at=deadline, color = color)
        project.save()

        serializer = ProjectSerializer(project)
        return Response({ "project": serializer.data })

    
class ProjectView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)

        serializer = ProjectSerializer(project)
        return Response({ "project": serializer.data })
    
    def post(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            title = request.data['title']
            text = request.data['text']
            deadline = request.data.get('deadline')
        except KeyError:
            return Response({ "message": "Invalid key-value" }, status=status.HTTP_404_NOT_FOUND)
        
        project_task = ProjectTask(project_id=project, title=title, text=text, deadline_at=deadline)

        project_task.save()

        serializer = ProjectTaskSerializer(project_task)
        return Response({ "project_task": serializer.data })

    def patch(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            project.title = request.data.get('title', project.title)
            project.text = request.data.get('text', project.text)
            project.deadline_at = request.data.get('deadline', project.deadline_at)
        except KeyError:
            return Response({ "message": "Invalid key-value" }, status=status.HTTP_404_NOT_FOUND)

        project.save()

        serializer = ProjectSerializer(project)
        return Response({ "project": serializer.data })
    
    def delete(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        project.delete()
        return Response({ "message": "Project successfuly removed" })

class ProjectTaskView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self, request, **kwargs):
        try:
            project_pk = kwargs['project_pk']
            project_task_pk = kwargs['project_task_pk']
        except KeyError as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        try:
            project = Project.objects.get(pk=project_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            project_task = ProjectTask.objects.get(pk=project_task_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProjectTaskSerializer(project_task)

        return Response({ "project_task": serializer.data })
    
    def post(self, request, **kwargs):
        try:
            project_pk = kwargs['project_pk']
            project_task_pk = kwargs['project_task_pk']
        except KeyError as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            project = Project.objects.get(pk=project_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            project_task = ProjectTask.objects.get(pk=project_task_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            text = request.data['text']
        except KeyError as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        

        task = Task(project_task_id=project_task, text=text)
        task.save()
        
        serializer = TaskSerializer(task)

        return Response({ "task": serializer.data })

    def patch(self, request, **kwargs):
        try:
            project_pk = kwargs['project_pk']
            project_task_pk = kwargs['project_task_pk']
        except KeyError as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            project = Project.objects.get(pk=project_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            project_task = ProjectTask.objects.get(pk=project_task_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        project_task.title = request.data.get('title', project_task.title)
        project_task.text = request.data.get('text', project_task.text)
        project_task.deadline_at = request.data.get('deadline', project_task.deadline_at)

        project_task.save()
        
        serializer = ProjectTaskSerializer(project_task)

        return Response({ "project_task": serializer.data })
    
    def delete(self, request, **kwargs):
        try:
            project_pk = kwargs['project_pk']
            project_task_pk = kwargs['project_task_pk']
        except KeyError as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            project = Project.objects.get(pk=project_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            project_task = ProjectTask.objects.get(pk=project_task_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        project_task.delete()
        
        return Response({ "message": "Project task successfuly removed" })
    
class TaskView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self, request, **kwargs):
        try:
            project_pk = kwargs['project_pk']
            project_task_pk = kwargs['project_task_pk']
            task_pk = kwargs['task_pk']
        except KeyError as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            project = Project.objects.get(pk=project_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            task = Task.objects.get(pk=task_pk)
        except Task.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TaskSerializer(task)
        return Response({ "task": serializer.data })
    
    def patch(self, request, **kwargs):
        try:
            project_pk = kwargs['project_pk']
            project_task_pk = kwargs['project_task_pk']
            task_pk = kwargs['task_pk']
        except KeyError as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            project = Project.objects.get(pk=project_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            task = Task.objects.get(pk=task_pk)
        except Task.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        task.text = request.data.get('text', task.text)
        task.is_done = request.data.get('done', task.is_done)
        task.save()
        
        serializer = TaskSerializer(task)
        return Response({ "task": serializer.data })
    
    def delete(self, request, **kwargs):
        try:
            project_pk = kwargs['project_pk']
            project_task_pk = kwargs['project_task_pk']
            task_pk = kwargs['task_pk']
        except KeyError as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            project = Project.objects.get(pk=project_pk)
        except ProjectTask.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)

        if project.user_id != request.user:
            return Response({ "message": "Not authorized" }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            task = Task.objects.get(pk=task_pk)
        except Task.DoesNotExist as e:
            return Response({ "message": str(e) }, status=status.HTTP_404_NOT_FOUND)
        
        task.delete()
        return Response({ "message": "Task task successfuly removed" })

@api_view(['POST'])
def auth(request):
    try:
        username = request.data['username']
        password = request.data['password']
    except KeyError:
        return Response({ "message": "Invalid key-value" }, status=status.HTTP_404_NOT_FOUND)
    
    try:
        user = User(username=username, password=password)
        user.save()
    except IntegrityError:
        return Response({ "message": "User already exists" }, status=status.HTTP_400_BAD_REQUEST)

    token = Token.objects.create(user=user)
    serializer = UserSerializer(user)
    
    return Response({ "user": serializer.data, "token": token.key })

@api_view(['POST'])
def login(request):
    try:
        username = request.data['username']
        password = request.data['password']
    except KeyError:
        return Response({ "message": "Invalid key-value" }, status=status.HTTP_404_NOT_FOUND)
    
    try:
        user = User.objects.get(username=username, password=password)
    except User.DoesNotExist:
        return Response({ "message": "Invalid credentials" }, status=status.HTTP_400_BAD_REQUEST)

    try:
        token = Token.objects.get(user=user)
    except Token.DoesNotExist:
        token = Token.objects.create(user=user)

    serializer = UserSerializer(user)
    
    return Response({ "user": serializer.data, "token": token.key })
        


