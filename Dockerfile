# base - ubuntu
FROM ubuntu:latest
# updating all that need to be updated
RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  # installing python
  && pip3 install --upgrade pip
# throwing port 80
EXPOSE 80
# copy event-proucer folder to virtual environment
COPY ./data-import-services/event-producer /event-producer
# jumping to this directory
WORKDIR /event-producer
# reading existing requirements
RUN pip install -r requirements.txt
# running app with uvicorn on 80 port which we have already threw
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]