## Table of Contents

-   [Deployment with Docker](#deployment-with-docker)
-   [Local Clone / Development](#local-clone)
-   [Configuration](#configuration)
-   [Important Notes](#important-notes)

## Deployment with Docker

<br/>

**Host Requirements:**

-   Docker + Docker-Compose

> **IMPORTANT NOTE**: The steps below require you to have an active internet connection. If you're building the project offline - refer to the [offline setup guide](./deployment/offline-build/setup-guide.md) instead.

Steps:

1. Browse to `https://github.com/N1TZANKL/kippa-aduma`,download the project as a zip file and extract it.

2. Create a file named `.env` in the root of the project folder.

    > Refer to the [Configuration](#configuration) section below for more details about the `.env` file contents.

3. From inside the extracted project folder, run the following command: `docker-compose up`.

    This will build the docker images and start them afterwards, so it might take a while.

4. Browse to `http://localhost`. Kippa Aduma should be up!

## Local clone

<br/>

**Host Requirements:**

-   MongoDB
-   NodeJS + NPM
-   Git

**Recommended development tools:**

-   Visual Studio Code (with extention [_Prettier_](https://github.com/prettier/prettier)),
-   Robo 3T / MongoDB Compass

Steps:

1. Run the following command: `git clone https://github.com/N1TZANKL/kippa-aduma.git`

    > **NOTE:** The commands described in the following steps should be run from the root of the (cloned) project folder.

2. Run the following command: `npm install`

3. Create a file named `.env.local` in the root of the project folder.

    > Refer to the [Configuration](#configuration) section below for more details about the `.env.local` file contents.

4. Configure your local MongoDB service:

    - Make sure your local MongoDB config has the `replicaSet` option enabled
    - Create a database with the name you specified in `.env.local` (`$DB_NAME`) and set authentication for it (create a user named `$MONGO_USERNAME` with password `$MONGO_PASSWORD` with `readWrite` permissions to the database `$DB_NAME`).

5. To run Kippa Aduma locally:

    - Make sure the MongoDB service is up and configured correctly as described above.
    - Run the following two commands:
        - `npm run dev`
        - `npm run dev-services`

6. Browse to `http://localhost:3000`. Kippa Aduma should be up!

## Configuration

<br/>

There are required environment variables you need to supply for this project to run. If you're deploying for production, the file should be named `.env`, and if hosting locally in developer mode - `.env.local`. Both these files should be placed in the project's root folder.

These files should contain the environment variables as described in the file [next-env.d.ts](./next-env.d.ts). The content of some of these variables is very sensitive, so make sure you don't publicly share the `.env` file in any way.

## Important Notes

<br/>

-   **Tested on a Windows 10 host with the following tools + versions:**

    -   Docker v20.10.2 + Docker-Compose v1.27.4 (both installed using Docker Desktop)

    -   MongoDB v4.4.3

    -   Node v14.15.5 + NPM 7.6.0
