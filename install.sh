#!/bin/bash

echo "This script assumes that you already have"
echo "npm, node and docker installed."
read -p "Do you meet these prerequisites (Y/n)? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]; then
  # do dangerous stuff
  if [ ! -f client/.env ]; then
    cp .env.dist client/.env
  fi
  if [ ! -f .env ]; then
    cp .env.dist .env
  fi
  cd client
  sudo npm install react-scripts@2.1.3
  sudo npm install @material-ui/core
  cd ..
  #sudo docker-compose up --build --force-recreate
  sudo docker-compose up --build
fi
