FROM python:3.8
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip install -r requirements.txt
COPY ./backend/* /backend/
