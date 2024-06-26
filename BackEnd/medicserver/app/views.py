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
from dotenv import load_dotenv
from django.middleware.csrf import get_token


#utility functions
from .utils.file_processing import processFile

#get csrf token
def get_csrf_token(request):
    logging.info("get_csrf_token____")
    username = request.GET.get('username')
    logging.info('user [%s]',username)
    return JsonResponse({'csrfToken': get_token(request)})


#upload image and get data 
@csrf_exempt
def upload_image(request):
    logging.info("upload_image____")
    if request.method == 'POST' and request.FILES.get('file'):
        api_key = request.headers.get('X-APIKEY')
        load_dotenv()
        SECRET_KEY = os.getenv('SECRET_KEY')
        if api_key != SECRET_KEY:
            return JsonResponse({'error': 'Invalid API Key'}, status=401)

        username = request.headers.get('X-USERNAME')
        if not username:
            return JsonResponse({'error': 'Username not found'}, status=401)

        print("request from :"+username)
        
        uploaded_image_file = request.FILES['file']
        ret = {
            "status": 200,
            "mssg": "success",
            "data": {},
            "file_url": ""
        }

        processFile(uploaded_image_file, username, ret)
        print("processing done")

        if(ret["status"]!=200):
            return JsonResponse({'error': ret["mssg"]}, status=ret["status"])

        print("done")
        return JsonResponse({'message': 'File uploaded successfully', 'ret': ret})
    return JsonResponse({'message': 'No file found'}, status=400)

#index view
def index(request):
    logging.info("index____")
    return render(request, "app/index.html")


# logging.debug("This is a debug message")
# logging.info("This is an info message")
# logging.warning("This is a warning message")
# logging.error("This is an error message")
# logging.critical("This is a critical message")

#custom error handling [TODO: is there better approach?]
# ret = {
#     "status": 200,
#     "mssg": "success",
#     "data": {}
# }