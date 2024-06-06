from datetime import datetime
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
import logging
from django.contrib import messages

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os

from django.middleware.csrf import get_token

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_exempt
def upload_image(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        file_name = default_storage.save(file.name, ContentFile(file.read()))
        file_url = os.path.join('/media/', file_name)
        return JsonResponse({'message': 'File uploaded successfully', 'file_url': file_url})
    return JsonResponse({'message': 'No file uploaded'}, status=400)

# Create your views here.
def index(request):
    print("print messages")
    logging.debug("This is a debug message")
    logging.info("This is an info message")
    logging.warning("This is a warning message")
    logging.error("This is an error message")
    logging.critical("This is a critical message")
    return render(request, "app/index.html")


##################################################
#logging 
# logging.debug('debugging.')
# logging.info('Relax!')
# logging.warning('Something')
# logging.error('unexpected')
# logging.critical('OMG!!!')
# lol= "123456789"
# logging.error('%s normal. Relax! %s',lol,42)