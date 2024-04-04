commands - 
django-admin startproject medicserver
python manage.py startapp backend


packages installed -
pip install django 


django commands -
python manage.py runserver (requires settings.py file!!!)

for logs : 
    import logging

    logging.debug("This is a debug message")
    logging.info("This is an info message")
    logging.warning("This is a warning message")
    logging.error("This is an error message")
    logging.critical("This is a critical message")


extra 
git update-index --assume-unchanged <filename>
#keep file in both remote and local, but dont track changes 

git rm --cached <filename>
git rm -r --cached <folder>
#remove the file from server, keep in local, stop tracking


