from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deadline_at = models.DateField(null=True)
    color = models.CharField(max_length=255)

class ProjectTask(models.Model):
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project_tasks')
    title = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deadline_at = models.DateField(null=True)

class Task(models.Model):
    project_task_id = models.ForeignKey(ProjectTask, on_delete=models.CASCADE, related_name='tasks')
    text = models.TextField()
    is_done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deadline_at = models.DateField(null=True)

