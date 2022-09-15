## Docker Environment

There are 4 main components
 
* nginx: webserver
* mysql: database backend
* django: django backend
* phpmyadmin: viewing the databse through the web interface

## Starting the services

Bringing services up

```
docker-compose up --detach
```

Bringing services down

```
docker-compose down
```

## Web server

Anything in `web` will be automatically served by nginx server. Access via

http://localhost:80

## phpmyadmin

To access the database through the web interface

http://localhost:8080


## django backend

To access the django backend

http://localhost:8000

### migrating django database

```
docker-compose run --workdir /backend/backend django  python manage.py makemigrations myapp
docker-compose run --workdir /backend/backend django  python manage.py migrate
```

## Windows Instructions
Follow [this link](https://docs.docker.com/docker-for-windows/wsl/#develop-with-docker-and-wsl-2) to
1. Set up Windows Subsystem for Linux(WSL).
2. Install Docker Manager for Windows.
3. Configure WSL to run with docker locally.

Bringing Docker services up in WSL:

```
docker-compose up -d
```
or
```
sudo docker-compose up -d
```

** Make sure to have cloned the repo under where WSL is running. For example, if I have my repo under D:\OWEN\2020-five-word-passwords\ but docker running in C:\home\owen, the docker will not start properly. The repo need to be in a directory under C:\home\owen as well.
