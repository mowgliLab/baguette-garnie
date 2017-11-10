Setup
=====

Creating data base
------------------
execute 'baguette-garnie/misc/create_db.sql' in a mySql database server


Configuration for bg-back-end project
-------------------------------------
in path 'baguette-garnie/bg-back-end/src/' create a new file config.json


content of config.json :
```json
{
    "type": "mysql",  
    "host": "YOUR_HOST",  
    "username": "YOUR_USERNAME",  
    "password": "YOUR_PASSWORD",  
    "database": "projet_integration_2017",  
    "synchronize": false,  
    "logging": false  
}
```


Install and run bg-back-end
---------------------------
into your `baguette-garnie/bg-back-end` folder, run cmd
```
npm install
npm run build
npm run start
```
(server is running on port 8080 with http protocol)

ex: [http://localhost:8080/api/public/menu](http://localhost:8080/api/public/menu)


Install and run angular-front
-----------------------------
into your 'baguette-garnie/angular-front/' folder, run cmd
```
npm install
npm run build
npm run start
```
(preview is running on port 4200)

ex: [http://localhost:4200](http://localhost:4200)


Fake Users for test purpose
---------------------------

| firstname | lastname  | mail           | password | 
| --------- | --------  | ----           | -------- | 
| Daenerys  | Targaryen | d.targ@got.com | drogo    | 
| John      | Snow      | j.snow@got.com | winter   | 
| Cersei|Lannister|c.lanni@got.com|queen|
|Tyrion|Lannister|t.lanni@got.com|halfman|
|Sansa|Stark|s.stark@got.com|queen|
|Arya|Stark|a.stark@got.com|faceless|
