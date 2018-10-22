# family
example application developed with Spring Boot + Angular 7 + MySQL

How to launch application:

Use maven with command 'mvn package docker:build'.

Next, the docker image will be created. Now, you should launch the Docker conteners (SpringBoot + MySQL):
  docker run -d --name family-db -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=family -e MYSQL_USER=pawel -e MYSQL_PASSWORD=12345 mysql:latest
  docker run -d --name family-spring --link family-db:mysql -p 8080:8080 -e DATABASE_HOST=family-db -e DATABASE_PORT=3306 -e DATABASE_NAME=family -e DATABASE_USER=pawel -e DATABASE_PASSWORD=12345 family

In addition, you should start Angular server (you need angular-cli) with commands: 
  npm install
  ng serve
