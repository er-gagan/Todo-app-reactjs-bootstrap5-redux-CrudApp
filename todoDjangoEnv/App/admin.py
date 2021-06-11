from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'phone']
    class Media:
        css = {"all": ("css/UserModel.css",)}   # css injection
        js = ('js/UserModel.js',)    # js injection

admin.site.register(User, UserAdmin)


@admin.register(Todos)
class TodosAdmin(admin.ModelAdmin):
    list_display = ['Title', 'user']


@admin.register(OtpVerify)
class OtpVerifyAdmin(admin.ModelAdmin):
    list_display = ['otp', 'user']


@admin.register(socialSignin)
class socialSigninAdmin(admin.ModelAdmin):
    list_display = ['user', 'provider', 'uid']
