#!/usr/bin/env bash

PORT=9000
IMAGE_NAME=$(basename "$(cd "$(dirname "$0")" && pwd)")

if [ -z $(docker images -q $IMAGE_NAME) ]; then
  docker build -t $IMAGE_NAME .
fi

docker run -p $PORT:$PORT -i -t --env NODE_PORT=$PORT $IMAGE_NAME
