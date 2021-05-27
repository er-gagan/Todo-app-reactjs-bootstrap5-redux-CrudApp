from django.contrib import admin
from .models import *

@admin.register(Todos)
class TodosAdmin(admin.ModelAdmin):
    list_display = ['Title', 'id']

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['Name', 'Username', 'Phone', "Gender"]