#!/usr/bin/bash

stop_container() {
  # Get the container ID of the matching container, if any
  container_id=$(docker ps -aqf "name=ektenis_chromoscope.*")
  # If the container ID is not empty, then stop the container
  if [ -n "$container_id" ]; then
    echo "Stopping existing container $container_id"
    docker stop "$container_id"
  else
    echo "No matching container found"
  fi
}

remove_container() {
  # Get the container ID of the matching container, if any
  container_id=$(docker ps -aqf "name=ektenis_chromoscope.*")
  # If the container ID is not empty, then remove the container
  if [ -n "$container_id" ]; then
    echo "Removing existing container $container_id"
    docker rm -f "$container_id"
  else
    echo "No matching container found"
  fi
}

remove_image() {
  # Get the image ID of the matching image, if any
  image_id=$(docker images -q "ektenis_chromoscope")
  # If the image ID is not empty, then remove the image
  if [ -n "$image_id" ]; then
    echo "Removing existing image $image_id"
    docker rmi -f "$image_id"
  else
    echo "No matching image found"
  fi
}

build_image() {
  # Get the absolute path of the directory where the script is located
  script_dir=$(dirname "$(readlink -f "$0")")
  # Use docker build command to build an image from the Dockerfile in that directory
  docker build -t ektenis_chromoscope "$script_dir"
}

run_container() {
  # Use docker run command to create and start a container from the image
  # You can specify the ports and volumes as options to the command
  # For example, to expose port 80 and mount the current directory as /app
  docker run -d -p 4173:4173 -p 3000:3000 -v $(pwd):/app --name ektenis_chromoscope_container ektenis_chromoscope
}

stop_container
remove_container
remove_image
build_image
run_container