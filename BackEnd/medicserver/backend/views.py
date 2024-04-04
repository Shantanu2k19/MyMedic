import logging
from django.shortcuts import render
from django.shortcuts import redirect

# Create your views here.
def index(request):
    logging.info("Index")
    return render(request, "app/index.html")

def index2(request):
    if request.method=="POST":
        # Get the post parameters
        name=request.POST['name']
        if name=='shan':
          #messages.info(request, 'hello shan!')
          return render(request, "app/index2.html")
        else:
          #messages.info(request, 'who r u? '+name)
          return render(request, "app/index2.html")
    return redirect("index")

