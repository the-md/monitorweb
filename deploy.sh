#!/bin/bash

cd /var/www/monitorweb/data/www/monitorweb.pro

git pull origin main

docker-compose up -d

exit 0