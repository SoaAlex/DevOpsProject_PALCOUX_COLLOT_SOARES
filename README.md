# DevOpsProject_PALCOUX_COLLOT_SOARES
ECE - DevOps project - SOARES Alexandre (Gr4) | COLLOT Paul (Gr2) | PALCOUX Hector (Gr2)

## 1. Work performed

### Web application
  For the web application we used the application from the module 4
### CI/CD pipeline
  We used travis pipeline for our project as a continuous integration support. The link is below
  We used heroku as a continuous deployement service for our web application. Link is below again.
### Virtual environment using IaC approach 
  We use vagrant to configure a centOS virtual machine, along with Ansible for providing the installation of Kuberneties and Docker.
### Docker image
  DockerFile permit to create an image of our webserver in a docker container, in this container, we need to install all of our dependencies and modules for npm.
  But the web application need a redis server for start normally.
### Docker Compose
  little text about our docker compose
### Kubernetes
  little text about kubernetes
### Istio
  little text about istio

## 2. Instructions
### Installation
  1. Clone the repository

    git clone https://github.com/SoaAlex/DevOpsProject_PALCOUX_COLLOT_SOARES/tree/main  
  2. Install Vagrant
  3. Install Virtual Box guest addition plugins for synchrozied folders

  Note: we have been into trouble using any later version of the plugin than 0.21.0

    vagrant plugin install vagrant-vbguest --plugin-version 0.21.0

  4. From IaC directory, launch VM with Vagrant. Ansible will provide everything needed

    vagrant up



### Usage
  Swagger doc available at: http://localhost:3001/api-docs

### Testing
    npm test

## 3. Links

### Continuous Integration report
[![Build Status](https://travis-ci.com/SoaAlex/DevOpsProject_PALCOUX_COLLOT_SOARES.svg?token=wyr2LsxQv7Rz663oxwoS&branch=main)](https://travis-ci.com/SoaAlex/DevOpsProject_PALCOUX_COLLOT_SOARES)

### Docker Hub
[Docker image](https://hub.docker.com/repository/docker/alsoares59/devops-project)


## 4. Author

COLLOT Paul
SOARES Alexander
PALCOUX Hector

## 5. Sources
[Kubernetes with redis](https://stackoverflow.com/questions/53031852/how-to-deploy-a-node-js-with-redis-on-kubernetes)
[Ansible provisioning minikune with Vagrant](https://www.youtube.com/watch?v=xPLQqHbp9BM&feature=emb_title)
