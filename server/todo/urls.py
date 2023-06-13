from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.auth),
    path('login/', views.login),
    path('projects/', views.IndexView.as_view(), name="projects"),
    path('projects/<int:pk>/', views.ProjectView.as_view(), name="project"),
    path('projects/<int:project_pk>/project-tasks/<int:project_task_pk>/', views.ProjectTaskView.as_view()),
    path('projects/<int:project_pk>/project-tasks/<int:project_task_pk>/tasks/<int:task_pk>/', views.TaskView.as_view())
]