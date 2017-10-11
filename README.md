Setup
=====

Creating data base
------------------
execute 'baguette-garnie/misc/create_db.sql' in a mySql database server


Configuration for bg-back-end project
-------------------------------------
in path 'baguette-garnie/bg-back-end/src/' create a new file config.json


`content of config.json :

{

  "type": "mysql",
  
  "host": "YOUR_HOST",
  
  "username": "YOUR_USERNAME",
  
  "password": "YOUR_PASSWORD",
  
  "database": "projet_integration_2017",
  
  "synchronize": false,
  
  "logging": false
  
}`


Install and run bg-back-end
---------------------------
into your `baguette-garnie/bg-back-end` folder, run cmd
`npm install
npm run build
npm run start`
(server is running on port 8080)


Install and run angular-front
-----------------------------
into your 'baguette-garnie/angular-front/' folder, run cmd
`npm install
npm run build
npm run start`
(preview is running on port 4000)