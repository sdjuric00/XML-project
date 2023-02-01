<h1 align="center">
  XML and Web Services Project
  <br>
</h1>

<p align="center">
  • <a href="#-project-setup-and-commands">FTN, Novi Sad, 2022</a>
  •
</p>


## 👨‍💻 Developers
    • Zorica Vuković        SW21-2019
    • Anastasija Samčović   SW44-2019
    • Srđan Đurić           SW63-2019

## 🚀 Project setup

#### <span style="vertical-align: middle">:warning:</span> *Pre requirements:*

- Installed Node.js
- Installed Docker Desktop
- Angular version 14+
- JDK version 1.8

#### <span style="vertical-align: middle">:floppy_disk:</span> *How to run backend:*

- Application is made up of four backend and one frontend service
- Open wanted backend in IntelliJ IDE as Maven project
- Click on reload project(Maven will update and download all dependencies)

#### <span style="vertical-align: middle">:floppy_disk:</span> *How to run eXist database:*

- Run Docker Desktop application
- When running first time:
    - Run <b>docker pull existdb/existdb</b> in terminal
    - Run <b>docker run -it -d -p 8080:8080 -p 8443:8443 --name exist existdb/existdb:latest</b>
- Run <b>docker container start exist</b> to start image after stopping it in Docker Desktop
- Go to <b>localhost:8080</b> to see data

#### <span style="vertical-align: middle">:floppy_disk:</span> *How to run eXist database:*

- Run Docker Desktop application
- When running first time:
    - Run <b>docker pull existdb/existdb</b> in terminal
    - Run <b>docker run -it -d -p 8080:8080 -p 8443:8443 --name exist existdb/existdb:latest</b>
- Run <b>docker container start exist</b> to start image after stopping it in Docker Desktop
- Go to <b>localhost:8080</b> to see data
- Username: admin
- Password: no password needed

#### <span style="vertical-align: middle">:floppy_disk:</span> *How to run RDF database:*

- Run Docker Desktop application
- When running first time:
    - Run <b>docker run -p 3030:3030 -e ADMIN_PASSWORD=pw123 stain/jena-fuseki</b> in terminal
- After that, every next time base can be started using Docker Desktop 
- Go to <b>localhost:3030</b> to see data
- Username: admin
- Password: pw123

#### <span style="vertical-align: middle">:floppy_disk:</span> *How to run frontend:*

- Open angular-app in wanted IDE (VSCode, WebStorm etc.)
- Run npm install in terminal to install all needed dependencies
- Run ng serve in terminal to start application

<br>

## 🤝 Useful to know:
- There are two types of user roles to login:
    - Citizen(gradjanini)
    - Admin (sluzbenik)

## 🏗️ Project structure:
- BACKEND
    - There are four backend applications, every application is being run on separate port
        - xml.project (service for users handling)
        - xml.project.copyright (service for creating copyright applications and responses)
        - xml.project.patent (service for creating patent applications and responses)
        - xml.project.trademark (service for creating trademark applications and responses)
    - Every backend service have model java classes, controllers, services, repository and xsd and xml files
- FRONTEND
    - There is one frontend application engaged for serving all backend services


## 📎 Useful links:

- Maven: https://maven.apache.org/
- Angular: https://angular.io/
- Zorica Vuković: https://www.linkedin.com/in/zorica-vukovic-937b34149/
- Anastasija Samčović: https://www.linkedin.com/in/anastasija-samcovic/
- Srđan Đurić: https://www.linkedin.com/in/srdjan-djuric/

