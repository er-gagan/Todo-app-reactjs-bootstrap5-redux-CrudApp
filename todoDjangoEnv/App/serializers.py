from rest_framework import serializers
from .models import *

class Todos_Serializers(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = '__all__'