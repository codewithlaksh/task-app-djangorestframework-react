from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TaskSerializer
from .models import Task

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/getTasks',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of tasks'
        },
        {
            'Endpoint': '/getTask/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single task object related to the id'
        },
        {
            'Endpoint': '/createTask',
            'method': 'GET',
            'body': None,
            'description': 'Creates a new task'
        },
        {
            'Endpoint': '/updateTask/id',
            'method': 'GET',
            'body': None,
            'description': 'Updates a single task related to the id'
        },
        {
            'Endpoint': '/deleteTask/id',
            'method': 'GET',
            'body': None,
            'description': 'Deletes a single task related to the id'
        }
    ]
    return Response(routes)

@api_view(['POST'])
def createTask(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({'task': serializer.data, 'message': 'Your task has been saved successfully!', 'msg_category': 'success'})

@api_view(['GET'])
def getTasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response({'tasks': serializer.data})

@api_view(['GET'])
def getTask(request, pk):
    task = Task.objects.filter(sno=pk).first()
    serializer = TaskSerializer(task, many=False)
    return Response({'task': serializer.data})

@api_view(['POST'])
def updateTask(request, pk):
    task = Task.objects.filter(sno=pk).first()
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({'task': serializer.data, 'message': 'Your task has been updated successfully!', 'msg_category': 'success'})

@api_view(['POST'])
def deleteTask(request, pk):
    task = Task.objects.filter(sno=pk).first()
    task.delete()
    return Response({'message': 'Your task has been deleted successfully!', 'msg_category': 'success'})