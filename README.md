# Bloom UI

![Production](https://github.com/swardeo/bloom-ui/workflows/Production%20Release/badge.svg?branch=master)

![Development](https://github.com/swardeo/bloom-ui/workflows/Development%20Release/badge.svg)

## What is Bloom?

Bloom was my final year project at Aston University, which aimed to help individuals explore a forecast of their financial situation.

This project contains the frontend of the application. The backend can be viewed [here](https://github.com/swardeo/bloom-services).

### Bloom is now offline :(

Screenshots of the application can be viewed in the [.screenshots directory](.screenshots).

**The bloom.money domain is no longer associated with myself or this project.**

## Available Scripts

In the project directory, you can run:

-   `yarn start` to run the application in development mode.
-   `yarn test` to run the test runner.
-   `yarn build` to build the application for production.

## Local Usage

### Storybook

Storybook is used to help develop components in isolation. In the project directory, you can run:

-   `yarn storybook` to view Bloom's Storybook.

### Running Locally

Running the application in a local, offline environment is not currently possible due to needing to authenticate with Amazon Cognito.

When running the application locally, you will instead be connected to the live development stack.

## Deployment Environments

### Development

A pipeline will deploy the application to the development environment automatically when a pull request is raised against the master branch.

The development environment can be viewed at ~~https://dev.bloom.money~~.

### Production

Another pipeline will deploy the application to the production environment automatically when a pull request has been merged to the master branch.

The production environment can be viewed at either ~~https://bloom.money~~ or ~~https://www.bloom.money~~.

## Infrastructure

The application is deployed to Amazon Web Services.

The infrastructure is modelled using AWS CloudFormation templates, which can be viewed [here](.cloudformation/stack.yaml).

## Scope

As this forms part of a time-constrained academic project, the scope has been limited, some details have been knowingly overlooked, and some things would have been done differently if time had allowed for it.

## Notes about the project

This is the first time that I have used React other than to build a few components and it is also the first time I have attempted to build a frontend of this scale. So, I am well aware that there are plenty of improvements which could be made. For example:

-   The state management of the application could be vastly improved. Currently, local state doesn't extend beyond each page.
-   With using the Material UI component library, components have just been imported and used where needed. Some of these still require styling to become appropriate for this application, which has led to duplication.
    -   A better alternative would have been to create a component where the Material UI component is imported, where it could be styled and then re-exported to be used throughout the application. This would then make it easier keep styling consistent and reduce duplication.
