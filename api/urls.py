from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='getRoutes'),
    path('getTasks', views.getTasks, name='getTasks'),
    path('getTask/<str:pk>', views.getTask, name='getTask'),
    path('createTask', views.createTask, name='createTask'),
    path('updateTask/<str:pk>', views.updateTask, name='updateTask'),
    path('deleteTask/<str:pk>', views.deleteTask, name='deleteTask')
]
