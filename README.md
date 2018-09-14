# FirstForFood [![Build Status](https://travis-ci.org/Anuoluwa/FirstForFood.svg?branch=develop)](https://travis-ci.org/Anuoluwa/FirstForFood)


## Project Overview
FirstForFood  (Fast-Food-Fast​ ) is a food delivery service app for a restaurant.


## Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
    * [Additional Feature](#additional-feature)
 * [API Endpoints](#api-endpoints)
 * [Getting Started](#getting-started)
    * [Installation](#installation)
    * [Testing](#testing)
    

### Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker at [](https://www.pivotaltracker.com/n/projects/2196952)

### Template


### API Deployment


## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework

### Supporting Packages

#### Linter(s)

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests
* [Supertest]() - 
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node

## Required Features
* Users can create an account and log in
* A user should be able to order for food
* The admin should be able to add, edit or delete the fast-food items
* The admin should be able to see a list of fast-food items
* The admin user should be able to do the following:
    * See a list of orders
    * Accept and decline orders
    * Mark orders as completed
* A user should be able to see a history of ordered food


## API Endpoints

###

<table>

<tr><th>HTTP METHOD</th><th>ENDPOINT</th><th>ACTION</th></tr>

<tr><td>GET</td> <td>api/v1/orders</td> <td>Get All orders</td></tr>

<tr><td>GET</td> <td>api/v1/orders/:orderId</td> <td>Get an order</td></tr>

<tr><td>POST</td> <td>api/v1/orders</td> <td>Make an order</td></tr>

<tr><td>PUT</td> <td>api/v1/orders/:orderId</td> <td>Update existing order</td></tr>

## Additional Endpoint

<tr><td>DELETE</td> <td>api/v1/orders/:orderId</td> <td>Cancel existing order</td></tr>

</table>

## Getting Started

### Installation

* git clone
  [FirstForFood](https://github.com/Anuoluwa/FirstForFood/tree/develop)
* Run `npm install` to install packages
* Run `npm start` to start the server
* Navigate to [localhost:3000](http://localhost:3000/) in browser to access the
  application

### Testing

#### Prerequisites

* [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

* After installing as shown above
* Navigate to [localhost:3000](http://localhost:3000/) in
  [Postman](https://getpostman.com/) to access the application

MIT License

Copyright (c) 2018 Anuoluwapo APITI
