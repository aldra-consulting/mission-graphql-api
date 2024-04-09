# Aldra | Mission GraphQL API

[![semantic-release: conventionalcommits](https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Description

A GraphQL API for managing missions.

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine
  - Docker and Docker Compose to run locally in a container

#### Running application locally on a host machine

- Install dependencies by running `npm install`
- Run one of the following commands:
  - `npm start` to start local development server
  - `npm run debug` to start local development server in debug mode

#### Running application in a Docker container

- Build a Docker container using the following command:
  - `docker build -f docker/app.Dockerfile -t aldra/mission-graphql-api-app .`
- Run the container using the following comand:
  - `docker run -d -p 8006:8000 -e NODE_ENV -e HOST -e PORT -e OIDC_ISSUER -e OIDC_AUDIENCE -e INTROSPECTION -e PLAYGROUND -e SANITY_TOKEN -e SANITY_PROJECT_ID -e SANITY_DATASET -e SANITY_API_VERSION -e NPM_CONFIG_UPDATE_NOTIFIER=false aldra/mission-graphql-api-app`

#### Running application using Docker Compose

- Run the application using the following command:
  - `docker-compose up -d`

## Environment Variables

- `NODE_ENV` - current environment
  - `development`
  - `production`
- `HOST` - application hostname (not necessary)
  - `0.0.0.0` (default)
- `PORT` - application port (not necessary)
  - `8006` (default)
- `OIDC_ISSUER` - OIDC issuer URI
  - `http://localhost:8001` (default in development mode)
  - `https://www.id.{env}.alra.no` (must be used in production-like environments)
  - `https://www.id.alra.no` (must be used in production)
- `OIDC_AUDIENCE` - inteded token audience
- `INTROSPECTION` - toggle GraphQL introspection query
  - `true`
  - `false`
- `PLAYGROUND` - toggles GraphQL Playground
  - `true`
  - `false`
- `SANITY_TOKEN` - Sanity token
- `SANITY_PROJECT_ID` - Sanity project ID
- `SANITY_DATASET` - Sanity dataset
- `SANITY_API_VERSION` - Sanity API version
- `NPM_CONFIG_UPDATE_NOTIFIER` - should be set to `false` to prevent application from crashing in a read-only environment

## Contributing

#### Branching Strategy

Whenever a new change is to be implemented, follow these steps:
  - Create a new branch from the `master` branch
  - Implement and commit changes
  - Create a pull request for code review

#### Commits

This repository uses conventional commmit format. In order to commit, follow these steps:
  - Stage files to be committed
  - Run `npm run commit` script

Avoid using `--no-verify` flag when making commits.
