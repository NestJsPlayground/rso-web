#!/usr/bin/env bash

docker-compose build
docker-compose up --exit-code-from app
