#!/bin/sh
cd "$(dirname "$BASH_SOURCE")"
docker-compose down
docker-compose up -d --build
docker image prune -f
rm -r node_modules
docker cp login_c:/home/node/app/node_modules ./
