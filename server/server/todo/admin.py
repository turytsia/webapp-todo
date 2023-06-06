from django.contrib import admin
from .models import Project, ProjectTask, Task

admin.site.register(Project)
admin.site.register(ProjectTask)
admin.site.register(Task)
