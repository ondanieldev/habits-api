<!-- Title -->
<h1 align="center">
  <img src="https://github.com/ondanieldev/rabbits-api/blob/HEAD/public/images/logo.png" alt="Logo" height="77px" />
  <br />
  <a href="#" style="color: #51CF66;">
    Rabbits API
  </a>
</h1>

<!-- Slogan -->
<p align="center">
  <strong>A RESTful API to manage your routine</strong><br>
  Currently on experimental phase
</p>

<!-- GitHub Badges -->
<p align="center">
  <a href="https://github.com/ondanieldev/rabbits-api/blob/HEAD/package.json">
    <img src="https://github.com/ondanieldev/rabbits-api/actions/workflows/develop.yaml/badge.svg" alt="CI status." />
  </a>
</p>

<!-- Repository Badges -->
<p align="center">
  <a href="https://github.com/ondanieldev/rabbits-api/blob/HEAD/package.json">
    <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fondanieldev%2Frabbits-api%2Fraw%2FHEAD%2Fpackage.json&query=%24.version&label=Current%20version&color=51CF66" alt="Current version." />
  </a>
  <a href="https://github.com/ondanieldev/rabbits-api/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-51CF66.svg" alt="Released under the MIT license." />
  </a>
  <a href="https://github.com/ondanieldev/rabbits-api/blob/HEAD/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-Welcome-51CF66.svg" alt="PRs welcome!" />
  </a>
</p>

<!-- Body -->
## Description

Rabbits API is a RESTful API built to be integrated by Rabbits Mobile app.

## How to setup

- Node:
  - Run `yarn` to install dependencies.
- Environment variables:
  - Copy `env.example` to a new `.env` file;
  - Fill/replace `.env` with the required credentials.
- Docker:
  - Create a `docker-compose.override.yml` if you want to change something of `docker-compose.yml`;
  - Run `yarn docker:build` to build the API into a new docker image;
  - Run `yarn docker:up` to set up all containers.
- Migrations:
  - Run `yarn migration:up` to generate postgresql database structure;
  - If you want to create a new migration, you can do so by running `NAME=MigrationName yarn migration:create`;
  - IF you want to rollback the last executed migration, run `yarn migration:down`.

## How to run

- Run `yarn start:dev`.

## How to test

### Running unit tests

- Run `yarn test:unit` to execute tests;
- Run `yarn test:unit:cov` to execute tests and generate coverage reports:
  - Coverage reports will be available under `test/coverage` folder.

## How to lint

- Run `yarn fix` to fix linting issues;
- Run `yarn lint` to check for linting issues. If some of them was not solved by `yarn fix`, you will see related files and description on terminal, so you can manually solve them.

## How to build

- Run `yarn build`.

## How to deploy

- Setup the following [GitHub secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository):
  - SSH_HOST:
    - It is your server host. e.g.: `122.0.0.1`.
  - SSH_USER:
    - It is your server user. e.g.: `root`.
  - SSH_PORT:
    - It is your server ssh port. Usually it is `22`.
  - SSH_KEY:
    - You can generate a new ssh key-pair on linux by running `ssh-keygen`;
    - Once generated, copy the public key to your server's `authorized_keys` file, which is usually located at `.ssh/authorized_keys`;
    - The private key, on the other hand, is the value of the secret.
- Every push to the `develop` branch will trigger a GitHub CI workflow. This workflow is available under the `.github/workflows` folder. Once ran, the code will be deployed on the server.

## How to contribute

If you want to contribute, please check [contributing](https://github.com/ondanieldev/rabbits-api/blob/HEAD/CONTRIBUTING.md).

## Links

- [API](https://rabbits-api.ondaniel.com.br)
- [Insomnia](https://github.com/ondanieldev/rabbits-api-insomnia)
- [Roadmap](https://ondanieldev.notion.site/Rabbits-Roadmap-05a85728e4d946cd8b4fb51dea256ce0)
- [Swagger](https://rabbits-api.ondaniel.com.br/api)
- [Rabbits Mobile repository](https://github.com/ondanieldev/rabbits-mobile)
