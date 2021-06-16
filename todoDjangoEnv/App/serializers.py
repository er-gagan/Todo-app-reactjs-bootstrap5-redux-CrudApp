from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'username', 'password',
                  'email', 'phone', 'gender', 'user_pic']
        extra_kwargs = {"password": {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class TodosSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = Todos
        fields = ['id', 'Title', 'Description', 'Date']


# class socialSigninSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = socialSignin
#         fields = ['photoUrl']
