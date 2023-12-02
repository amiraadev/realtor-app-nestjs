<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
# REALTOR App - House Data Management

This Nest.js project is a backend service designed to manage house data for sale, serving as an infrastructure similar to the REALTOR app. It leverages various technologies and features to handle data securely and efficiently.

## Features

### Technologies Used

- **PostgreSQL Database**: Houses the application's data using Prisma as the ORM to interact with the database.
- **Prisma**: Provides a type-safe database access layer and schema management.
- **Interceptors**: Utilized to modify and handle incoming requests and outgoing responses.
- **Class Validator**: Validates and ensures the correctness of incoming data structures.
- **Class Transformer**: Used for transforming incoming data into specific DTOs (Data Transfer Objects).
- **Guards**: Implements guards to control access to routes based on certain conditions.
- **Authorization & Authentication**: Utilizes JWT (JSON Web Tokens) for secure user authentication and authorization.

## Usage

### Prerequisites

- Node.js and npm installed
- PostgreSQL database setup and configured
- Set environment variables for database connection and JWT secret

### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up the environment variables (e.g., database connection, JWT secret) in the `.env` file.
4. Run `npm run start:dev` to start the development server.

### Endpoints

- `/home`: Manages house data, including creation, retrieval, updating, and deletion.
- `/auth`: Handles user authentication and authorization.

## Contributing

Contributions and feedback are welcome! Please feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
