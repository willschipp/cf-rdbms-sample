## simple web app connected to a RDBMS

Simmple Web App that runs with any relational database and provides basic CRD functions (update not implemented).

Uses
- Spring Boot
- Spring Data JPA
- Spring MVC (RestController)
- Spring Security (Web)
- backbone
- bootstrap


### Getting started

- clone
- build (mvn clean package)
- push to CloudFoundry

```

cf login
cf create-service cleardb spark cf-test-db
cf push my-app -p target/cf-rdbms-sample-0.0.1-SNAPSHOT.war -m 512M --no-start
cf bind-service my-app cf-test-db
cf start my-app

```

#### Spring Boot
- packaging

#### Spring Data JPA
- rdbms interface including Schema creation from POJO

#### Spring MVC (RestController)
- provides custom REST API access to objects /data/person

#### Spring Security
- enforces authentication to the UI and endpoints


### Username/password
user/password