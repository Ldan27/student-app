- in the package.json "type": "module" will allow us to use the import syntax

# 1 how to make a full crud api with express

- how to create our custom errorHandler
- how to handle CastError and ObjectId
- how to make stack trace
- how to chain on one route that have two method

# 2 how to setup our database

1 sign in to mongoDB
2 create organisation if you don't have one
3 create new project
4 create cluster
5 create name and password
6 use mongoDB compass for connecting your cluster
7 create a database name and collection

# 3 how to connect our database to our application

1 copy the connection string and paste it in the .env file in MONGO_URI variable
2 change the password and add your database name after slash in the string name
3 in the backend folder create a folder called config
4 and then within this create a file called db.js
5 mongoose.connect(MONGO_URI) this line connect your entire application to the database
6 bring it to server.js and run it like this connectDB()

# 4 how to create data model for users

1 create a folder called model
2 within this create a file called userModel.js
3 mongoose.Schema({fields})
4 export and bring it in controllers

# 5 how to hash password before saving into the database with bicrypt

# 6 how to generate a json web token and save that in a http only cookie

1 in the backend folder create a folder called utils
2 within this folder create a file called generateToken
3 bring jwt in this file
4 create a function called generateToken that takes in res and userId
5 create the token in that function using the method sign that takes the payload and the secret
6 the method sign takes in the payload , the secret and then an object with the option of expiresIn
7 now you have to save that in a cookie

# how to register

# how to login

# how to logout

# how to protect our route

1 create the authMiddleware

# seconde part frontend

using this command : npm create vite@latest frontend

# install our dependecies in our frotend folder

# how to setup vite config

# how to run the react dev server

# how to run the backend and the frontend at the same time

install the package called concurrently as a dev dependancies

# how to use react bootstrap and fontawsome

# how to setup bootstrap

# how to create a landing page in the screen folder

# how to start working with the router

# how to setup our router

# how to render a screen or path we're on in the App.jsx

# how to get into our global state

run this command line first : npm i @reduxjs/toolkit react-redux

# how to create our store

# how to create a slice

# how to use any slice

you have to bring in to your store

# how to implement any slice from screens(the UI)

# how to fire off our mutation from screens(the UI)

# how to get the user data from screens(the UI)

use the useSelector hook

# how to use react-toastify

# how to create a loader

# how to have a private route Components

# how to deploy
