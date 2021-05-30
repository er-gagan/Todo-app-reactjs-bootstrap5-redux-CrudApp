from django.contrib import admin
from .models import *

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'phone']

@admin.register(Todos)
class TodosAdmin(admin.ModelAdmin):
    list_display = ['Title', 'user']