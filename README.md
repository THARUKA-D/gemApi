# Api

## EndPoints

* (POST) http://localhost:3001/newUser - add a new user
* (POST) http://localhost:3001/addHobbies - add hobbies to users
* (GET) http://localhost:3001/fetchAllUsers - fetch all user data
* (POST) http://localhost:3001/login - login authentication
* (GET) http://localhost:3001/ - server health check 

## How to run ?

* Run mysql locally and add the credtential in both "src/utills/connect-sql.js" and "src/utills/mysql.js". 
* IN this code there is a bug when isitially creating the sql tabels,
  - run the server using "npm run dev" and save project 2 times.
  - in the second attempt server will be online. 

* then run the frontend project. 

## Initial login 

* An admin user is created initially.

- Login userName - admin@admin.com
- Login password - admin

## login from a newly added user

* login credentials for a user will be as below.

- Login userName - userEmail 
- Login password - FirstName@123
* (use the details used when creating the user).


