from .models import *
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework.reverse import reverse

class ToDoAppViews(APIView):
    def get(self, request, format=None):
        queryset = Todos.objects.all()
        serializer = Todos_Serializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:
            Id = request.data['id']
            Title = request.data['Title']
            Description = request.data['Description']
            Date = request.data['Date']
            todo = Todos(id=Id, Title=Title,
                         Description=Description, Date=Date)
            todo.save()
            serializer = Todos_Serializers(todo)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def put(self, request, format=None):
        Id = request.data['id']
        if Todos.objects.filter(id=Id):
            Title = request.data['Title']
            Description = request.data['Description']
            Date = request.data['Date']
            Todos.objects.filter(id=Id).update(
                Title=Title, Description=Description, Date=Date)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, format=None):
        Id = request.data['id']
        if Todos.objects.filter(id=Id):
            Todos.objects.filter(id=Id).delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PersonAppViews(APIView):
    def get(self, request, format=None):
        queryset = Person.objects.all()
        serializer = Person_Serializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:
            Id = request.data['id']
            Name = request.data['Name']
            Username = request.data['Username']
            Phone = request.data['Phone']
            Email = request.data['Email']
            Password = request.data['Password']
            Confirm_Password = request.data['Confirm_Password']
            Gender = request.data['Gender']
            person = Person(id=Id, Name=Name, Username=Username, Phone=Phone, Email=Email,
                            Password=Password, Confirm_Password=Confirm_Password, Gender=Gender)
            person.save()
            serializer = Person_Serializers(person)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def put(self, request, format=None):
        Id = request.data['id']
        if Person.objects.filter(id=Id):
            Name = request.data['Name']
            Username = request.data['Username']
            Phone = request.data['Phone']
            Email = request.data['Email']
            Password = request.data['Password']
            Confirm_Password = request.data['Confirm_Password']
            Gender = request.data['Gender']
            Person.objects.filter(id=Id).update(id=Id, Name=Name, Username=Username, Phone=Phone,
                                                Email=Email, Password=Password, Confirm_Password=Confirm_Password, Gender=Gender)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, format=None):
        Id = request.data['id']
        if Person.objects.filter(id=Id):
            Person.objects.filter(id=Id).delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ApiRoot(APIView):
    def get(self, request, format = None):
        return Response({
            'Todos': reverse('todos',request=request, format=format),
            'Persons': reverse('person',request=request, format=format),
        })