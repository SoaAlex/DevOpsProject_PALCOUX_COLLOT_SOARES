# DevOpsProject_PALCOUX_COLLOT_SOARES
ECE - DevOps project - SOARES Alexandre (Gr4) | COLLOT Paul (Gr2) | PALCOUX Hector (Gr2)

## 1. Work performed

### Web application
The web application is based on the module 4. We pimped it up a little bit by adding the Swagger UI. We also make every mocha tests working (you can try it yourself by launching npm test) and even added others.

### CI/CD pipeline
We used travis pipeline for our project as a continuous integration support. The link is below.

We used heroku as a continuous deployement service for our web application. Link is below again.

### Virtual environment using IaC approach 
We use vagrant to configure a centOS virtual machine, along with Ansible for providing the installation of Kuberneties, Docker and starting our Redis database with the web server. Ansible uses a playbook with tasks that install and setup all of this.

### Docker image
DockerFile permits to create an image of our webserver in a docker container, in this container, we need to install all of our dependencies and modules for npm. However the web application needs a redis server to start normally.

The built image is used by kubernetes to download directly from Docker Hub the web server

### Docker Compose
Our Docker Compose is just like the previous Dockerfile but it also pulls a redis image from Docker Hub and links it to our webserver that he builds. Hence, the web server is fully operational

### Kubernetes
Kubernetes are installed inside our Virtual Machine. It provides container ochestration, in other words, it controls mutliple instances of our web server using deployments configuration files. It also has multiple instances of our redis database. They comunicate with each other using services (.yaml configuration files)

### Istio
Istio is currently a work in progress.

## 2. Instructions
### Installation
  #### 1. Clone the repository

    git clone https://github.com/SoaAlex/DevOpsProject_PALCOUX_COLLOT_SOARES
  #### 2. Install Vagrant and VirtualBox
  Go to official Vagrant and VirtualBox websites and download versions for your OS.

  #### 3. Install Virtual Box guest addition plugins for synchrozied folders

  Note: we have been into trouble using any later version than 0.21.0 of the plugin 

    vagrant plugin install vagrant-vbguest --plugin-version 0.21.0

  #### 4. From IaC directory, launch VM CentOS with Vagrant. Ansible will provide everything needed from installing Docker, Kubernetes, and laucnhing the web server with the Redis database. It also creates a dashboard accessible inside the VM at http://localhost:47771 

    vagrant up



### Usage
  Swagger doc available at: http://localhost:3001/api-docs

### Testing
    npm test

## 3. Links

### Travis CI (Continuous Integration)
[![Build Status](https://travis-ci.com/SoaAlex/DevOpsProject_PALCOUX_COLLOT_SOARES.svg?token=wyr2LsxQv7Rz663oxwoS&branch=main)](https://travis-ci.com/SoaAlex/DevOpsProject_PALCOUX_COLLOT_SOARES)

### Docker Hub (server image)
[Docker image](https://hub.docker.com/repository/docker/alsoares59/devops-project)

### Heroku (Continuous Deployment)
**Note** Because Heroku Redis plugin requires giving credit card information, the website is not working. However, the Continuous Deployment pipeline is operationnal
- [Dashboard (requires login)](https://dashboard.heroku.com/apps/projet-devops)
- [App webpage](https://projet-devops.herokuapp.com/)

## 4. Author

COLLOT Paul
SOARES Alexander
PALCOUX Hector

## 5. Sources
- [Kubernetes with redis](https://stackoverflow.com/questions/53031852/how-to-deploy-a-node-js-with-redis-on-kubernetes)
- [Ansible provisioning minikune with Vagrant](https://www.youtube.com/watch?v=xPLQqHbp9BM&feature=emb_title)
- [Kuberneties with Redis 2](https://www.callicoder.com/deploy-multi-container-go-redis-app-kubernetes/)