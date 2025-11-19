Staff Management & Education Schedule

Introduction

A backend system for registering students and staffs to the portal and creating education schedules for the students.

Tech-Stack Used

Made use of Javascript, node.js, express.js and MongoDB to build this system. Installed libraries include mongoose for convenient database operations, bcrypt for password encryption, jsonwebtoken for JWT authentication, prettier for code formatting

Setup-Steps
1. Install VS code
2. Install node.js & add add node.js executable path to your systems's PATH environment variable(confirm : "node -v")
3. Create new project folder and drag to VS code
4. Run "npm init" in this directory to initialize the project
5. Create a readme file : "Readme.md"
6. Install Git for windows & add add git executable path to your systems's PATH environment variable (confirm : "git --version")
7. Git steps:
a. git config --global user.email "mail"
b. git config --global user.name "name"
c. git init (empty git repository initialization)
d. git add . (stages changes)
e. git commit -m "message" (creates new commit)
f. git remote add origin git@github.com: repo-name (after SSH keys generation in git)
g. git push -u origin main

8. Add .gitignore file (common gitignore generators are avaialble online)
9. Create .env file to store confidentials information like secret keys, db connection strings etc
10. In "package.json" file change the "type" to "module" for using ES6 module system
11. Install nodemon ("npm i nodemon") for automatic server restarts
12. Install prettier for better code-ormatting
13. Install all required libraries like jsonwebtoken, mongoose, bcrypt, cookie-parser