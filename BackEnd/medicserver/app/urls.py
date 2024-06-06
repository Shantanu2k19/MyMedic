from django.urls import path

from . import views
from .views import upload_image
from .views import get_csrf_token

urlpatterns = [
    #basic 
    path("",views.index,name="index"),

    #for files 
    path('upload/', upload_image, name='upload_image'),
    path('csrf/', get_csrf_token, name='get_csrf_token'),
]
