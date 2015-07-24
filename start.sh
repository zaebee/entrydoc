#!/bin/sh

apt-get install python3 -y
apt-get install python-virtualenv -y
virtualenv .env -p python3

.env/bin/pip install -req.txt
.env/bin/python manage.py runserver 0.0.0.0:80
