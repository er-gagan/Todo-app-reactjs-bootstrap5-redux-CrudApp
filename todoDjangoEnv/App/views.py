# from .models import *
# from rest_framework import status
# from rest_framework.response import Response
# from .serializers import Todos_Serializers
# from rest_framework.views import APIView
# from rest_framework.reverse import reverse

# Create your views here.

# class todos(APIView):
#     def get(self, request, format = None):
#         reg = Todos.objects.all()
#         serializer = Todos_Serializers(reg, many=True)
#         return Response(serializer.data)
    
#     def post(self, request, format = None):
#         serializer = Todos_Serializers(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class todo_Detail(APIView):
#     def get_object(self, pk):
#         try:
#             return Todos.objects.get(Id=pk)
#         except Todos.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
    
#     def get(self, request, pk, format = None):
#         todo = self.get_object(pk)
#         serializer = Todos_Serializers(todo)
#         return Response(serializer.data)
    
#     def put(self, request, pk, format = None):
#         todo = self.get_object(pk)
#         serializer = Todos_Serializers(todo, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)    
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def delete(self, request, pk, format = None):
#         todo = self.get_object(pk)
#         todo.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)