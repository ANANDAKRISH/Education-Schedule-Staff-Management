# Staff Management & Education Schedule

## Introduction

A backend system for registering students and staffs to the portal and creating education schedules for the students.

## Tech-Stack Used

Made use of Javascript, node.js, express.js and MongoDB to build this system. Installed libraries include mongoose for convenient database operations, bcrypt for password encryption, jsonwebtoken for JWT authentication, prettier for code formatting

## Setup-Steps
1. Install VS code
2. Install node.js & add add node.js executable path to your systems's PATH environment variable(confirm : "node -v")
3. Create new project folder and drag to VS code
4. Run "npm init" in this directory to initialize the project
5. Create a readme file : "Readme.md"
6. Install Git for windows & add add git executable path to your systems's PATH environment variable (confirm : "git --version")
7. Git steps:
    - git config --global user.email "mail"
    - git config --global user.name "name"
    - git init (empty git repository initialization)
    - git add . (stages changes)
    - git commit -m "message" (creates new commit)
    - git remote add origin git@github.com: repo-name (after SSH keys generation in git)
    - git push -u origin main

8. Add .gitignore file (common gitignore generators are avaialble online)
9. Create .env file to store confidentials information like secret keys, db connection strings etc
10. In "package.json" file change the "type" to "module" for using ES6 module system
11. Install nodemon ("npm i nodemon") for automatic server restarts
12. Install prettier for better code-ormatting
13. Install all required libraries like jsonwebtoken, mongoose, bcrypt, cookie-parser
14. Create account in MongoDB atlas web version and create a cluster & configure DB & Network access settings
15. Use "npm run dev" to start the server
16. Install Postman for API-Testing & structure according to controller files
17. Import the Postman collection in this repository in your postman app from "import option" on left sidebar

## Assumptions-Made
1. Used createAdmin.js script to add main Admin to the database
2. The main admin can then add more admins, staffs or students to the portal
3. staff.controller.js contains controllers that can be accessed only by staffs
4. admin.controller.js contains controllers that can be accessed only by admins
3. user.controller.js file contains controllers that can be accessed by atleast two roles
4. As there is no data that can be accessed by students alone, I avoided student.controller.js 




## Postman-Documentation Public URL
- https://documenter.getpostman.com/view/36195348/2sB3WyJbtQ#d6c21df4-d27c-4768-bbbe-33646b225548