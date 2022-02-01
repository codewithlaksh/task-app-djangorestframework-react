# Django React Task App

This is my new project that is a simple task app which is made using djangorestframework and react

Install the requirements
```batch
pip install -r requirements.txt
```

Create the node_modules folder inside the frontend app
```
npm i
```

- [ReactJS Documentation](https://reactjs.org/)
- [Django Rest Framework Documentation](https://www.django-rest-framework.org/)


Django Cors Headers has been used inside the settings.py file of the project. Please do not remove the following lines
- 'corsheaders' from INSTALLED_APPS
- 'corsheaders.middleware.CorsMiddleware' from MIDDLEWARE
- CORS_ALLOW_ALL_ORIGINS = True from the bottom of the file

Removing these lines will prevent the react server to get access to django server

- Features
  - Create a task
  - Edit a task with the appropriate id
  - Delete the task with javascript confirm box

- Default admin panel configurations
  - Username : admin
  - Password : 12345678

- Run the django server first
```batch
python manage.py runserver
```

- Go into the frontend folder
```batch
cd frontend
```

- Now run the react server
```batch
npm run start
```