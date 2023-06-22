# MVC Tech Blog

## Description

This application is a CMS-style Tech Blog, where developers can publish their blog posts and comment on other developers' posts as well. It follows the MVC paradigm in its architectural structure, uses Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Contributors](#contributors)
* [License](#license)
* [Contact](#contact)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project in your terminal and run `npm install` to install the necessary dependencies.
3. Be sure to have MySQL installed on your machine. Use the `schema.sql` file in the `db` folder to create your database.
4. Update the `.env` file in the root of the repo with your MySQL user and password.
5. To seed the database with data, run `npm run seed`.
6. Start the server by running `npm start`.

## Usage

[Deployed URL](https://shielded-earth-13580-f3500b139b12.herokuapp.com/)

Visit the deployed site and create a user account. Once logged in, you can view existing posts, add your own posts, comment on existing posts, and delete your own posts.

## Features

* Full CRUD functionality: Users can create, read, update, and delete posts when logged in.
* User authentication: Users can sign up, log in, and log out.
* Commenting: Users can add comments to posts.
* MVC architecture: The app follows the Model-View-Controller paradigm.
* Handlebars.js: The app uses Handlebars.js as a templating language.
* Sequelize ORM: The app uses Sequelize as the ORM for manipulating the MySQL database.

## Contributors

* Project requirements and instructions provided by Georgia Tech Coding Bootcamp.
* Additional educational resources: [Resource 1](https://www.udemy.com/course/nodejs-the-complete-guide/), [Resource 2](https://www.udemy.com/course/just-express-with-a-bunch-of-node-and-http-in-detail/).
* Application designed and built by [github/dereksutton](https://github.com/dereksutton).

## License

![MIT](https://img.shields.io/badge/license/license-MIT-blue.svg)
[MIT](https://opensource.org/licenses/MIT)

## Contact

Application designed and built by [github/dereksutton](https://github.com/dereksutton). You can email me [here](mailto:dereksutton86@gmail.com).

