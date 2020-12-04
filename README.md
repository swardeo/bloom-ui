# Bloom UI

![Production](https://github.com/swardeo/bloom-ui/workflows/Production%20Release/badge.svg?branch=master)

![Development](https://github.com/swardeo/bloom-ui/workflows/Development%20Release/badge.svg)

## What is Bloom?

Bloom is my final year project at Aston University, which aims to help individuals explore a forecast of their financial situation.

## Available Scripts

In the project directory, you can run:

-   `yarn start` to run the application in development mode.
-   `yarn test` to run the test runner.
-   `yarn build` to build the application for production.

## Storybook

Storybook is used to help develop components in isolation. In the project directory, you can run:

-   `yarn storybook` to view Bloom's Storybook.

## Deployment Environments

### Development

A pipeline will deploy the application to the development environment automatically when a pull request is raised against the master branch.

The development environment can be viewed at [dev.bloom.money](https://dev.bloom.money).

### Production

Another pipeline will deploy the application to the production environment automatically when a pull request has been merged to the master branch.

The production environment can be viewed at either [bloom.money](https://bloom.money) or [www.bloom.money](https://www.bloom.money).

## Infrastructure

The application is deployed to Amazon Web Services.

The infrastructure is modelled using AWS CloudFormation templates, which can be viewed [here](.cloudformation/stack.yaml).
