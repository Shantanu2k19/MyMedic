import os
import json
from django.views import View
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from backend.utils.extractMedicine import fetch_medicine
from backend.utils.extract_text import extractTextFromImage

from .models import User
from dotenv import load_dotenv

load_dotenv()

class client_class(View):
    def getinfo(request):
        if(request.method == 'GET'):
            return JsonResponse({'message': 'Please send POST request'}, status=405)

        print('get info')
        if request.method == 'POST' and request.FILES.get('image'):
            image_file = request.FILES['image']
            user = request.POST.get('username')
            if not user:
                user = "temp"
            file_name = default_storage.save(user+image_file.name, ContentFile(image_file.read()))
            # Get the URL of the saved file
            file_url = default_storage.url(file_name)
            print(file_url,'\n', file_name)
            
            text = extractTextFromImage(os.path.join(os.getcwd(), "files",file_name))
            
            #print(text)

            data = fetch_medicine(text)
            json_data = json.loads(data)

            return JsonResponse({
                'message': 'Operation success',
                'json_data':json_data
            })
        else:
            return JsonResponse({'error': 'Image file not found!'}, status=400)
        

class server_class(View):
    def createUser(request):
        if request.method == 'POST':
            print('create user')

            api_key = request.META.get('HTTP_APIKEY')
            user_name = request.META.get('HTTP_USERNAME')
            token = request.META.get('HTTP_TOKEN')

            #print(api_key,user_name,token)

            if not (api_key and user_name and token):
                return JsonResponse({'ERROR': 'Missing parameter(s)'}, status=400)
            
            #check user 
            if User.objects.filter(username=user_name).exists():
                return JsonResponse({'ERROR': 'Username taken'}, status=409)

            # Validate the API key
            if api_key == os.environ.get('SECRET_KEY'):
                try:
                    User.objects.create(username=user_name, token=token)
                    return JsonResponse({'message': 'User created successfully'}, status=200)
                except Exception as e:
                    return JsonResponse({'ERROR': 'User creation failed ->'+e}, status=409)
            else:
                return JsonResponse({'message': 'Invalid API key'}, status=401)

        return JsonResponse({'ERROR': 'Invalid request method'}, status=400)
