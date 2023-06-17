from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import Project, ProjectTask, Task

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','project_task_id', 'text', 'is_done', 'created_at', 'updated_at', 'deadline_at']

class ProjectTaskSerializer(ModelSerializer):
    tasks = TaskSerializer(many=True)
    class Meta:
        model = ProjectTask
        fields = ['id','project_id', 'title', 'text', 'created_at', 'updated_at', 'deadline_at', 'tasks']

class ProjectSerializer(ModelSerializer):
    project_tasks = ProjectTaskSerializer(many=True)

    class Meta:
        model = Project
        fields = ['id', 'user_id', 'title', 'text', 'created_at', 'updated_at', 'deadline_at', 'project_tasks', 'color']

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']
        
    

    