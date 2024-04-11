
from django.views import View
from django.shortcuts import render
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

from .models import User


class global_views_class(View):
    
    def index(request):
        print("Index page")
        return render(request, "app/index.html")
    
    #for Next server to get token for creating user
    #for client to get first csrf
    @csrf_exempt
    def getToken(request):
        print("getToken")

        if(request.method == 'POST'):
            user_name = request.META.get('HTTP_USER')
            token = request.META.get('HTTP_APIKEY')
            # for header_name, header_value in request.META.items():
            #     if header_name.startswith('HTTP_'):
            #         print(f"{header_name}: {header_value}")
            print(user_name)
            print(token)

            if not user_name:
                return JsonResponse({'ERROR': 'Missing username'}, status=400)
        
            if not token:
                return JsonResponse({'ERROR': 'Missing token'}, status=400)
            
            try:
                user = User.objects.get(username=user_name)

                if user.token == token:
                    csrf_token = get_token(request)
                    return JsonResponse({'csrf_token': csrf_token}, status=200)
                else:
                    return JsonResponse({'ERROR': 'Token does not match'}, status=401)
            except User.DoesNotExist:
                return JsonResponse({'ERROR': 'User does not exist'}, status=404)
            
        return JsonResponse({'ERROR': 'Invalid request method'}, status=400)