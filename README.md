Dockerfile contains ubuntu with python.
It launches main.py which is located in shuttle/data-import-services/event-producer/app/main.py
To run dockerfile, you need to write this in your terminal:
    docker build -t myimage .
and
    docker run -d --name mycontainer -p 80:80 myimage

There is also docker-compose file, which you can use to prevent manually entering comands in terminal. Click it and run it.