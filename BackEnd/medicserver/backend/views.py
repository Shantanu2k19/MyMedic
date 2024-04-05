import logging
import os
import json

from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from backend.utils.extractMedicine import fetch_medicine
from backend.utils.extract_text import extractTextFromImage

# Create your views here.
def index(request):
    logging.info("Index")
    return render(request, "app/index.html")

def getinfo(request):
    if(request.method == 'GET'):
        return JsonResponse({'message': 'please send get request'}, status=400)

    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        user = request.POST.get('username')
        file_name = default_storage.save(user+image_file.name, ContentFile(image_file.read()))
        # Get the URL of the saved file
        file_url = default_storage.url(file_name)
        print(file_url,'\n', file_name)
        
        text = extractTextFromImage(os.path.join(os.getcwd(), "files",file_name))
        
        #print(text)

        data = fetch_medicine(text)
        json_data = json.loads(data)

        return JsonResponse({
            'message': 'Image uploaded successfully',
            'json_data':json_data
        })
    else:
        return JsonResponse({'error': 'Image upload failed'}, status=400)
    