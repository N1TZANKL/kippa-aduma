## Table of Contents

-   [Gather Pre-requisites](#gather-pre-requisites)
-   [Build Steps](#build-steps)

## Gather Pre-requisites

> **NOTE:** For these steps, you must have an active internet connection.

1. Download Kippa Aduma's source code as a zip file from `github`.

2. Install `npm` and download Kippa Aduma's entire library dependencies - as specified in [package.json](../../package.json). To do this, extract the folder downloaded in the previous step, open a terminal in that folder and run `npm install`. A folder named `node_modules` will be created.

3. Install `Docker` and download the base docker images - as specified in [Dockerfile](Dockerfile), [services.Dockerfile](services.Dockerfile) and [mongo.Dockerfile](../../mongo.Dockerfile). After they are downloaded to your machine - export them.

    To _download_ a docker image, run: `docker pull <image-tag>`. <br/>
    To _export_ the downloaded image, run: `docker save -o <output-file-name>.tar <image-tag>`

4. Download executable installations of `Git` and `Docker Desktop`. Make sure these executables will work in an offline environment, and if needed, download any other necessary dependencies.

<br />

By now you should have all the dependencies needed to build `kippa aduma` offline:

-   Source code folder with library dependencies installed in `node_modules`.
-   Base Docker images
-   Installations of `Git` and `Docker Desktop` (and their possible dependencies).

<br/>

## Build Steps

Steps:

1. Copy all the dependencies specified in the previous section to the host, and install the executables of `Docker Desktop` and `Git`.

    > **NOTE:** By this step, you should be able to run any `docker` / `docker-compose` command from any terminal, as well as open the `git bash` terminal.

2. Load the docker images previously downloaded.

    To load a docker image, run: `docker load -i <image-name>.tar`;

3. Create a `.env` file in the root of the source code folder as specified in the [setup-guide > configuration](../../setup-guide.md#Configuration) section.

4. Open a `git bash` terminal from the root of the source code folder, and run the following commands:

    - `./deployment/scripts/create-key-file.sh`

        > **NOTE:** Make sure a file named `mongod-keyfile` was created inside the `/deployment-scripts/etc` folder.

    - `cd ./deployment/offline-build && ls -a1 | egrep '[dD]ocker' | xargs cp -t ../../`

        > **NOTE:** Make sure the files inside `./deployment/offline-build` were copied successfully to the root folder (for example, compare `./deployment/offline-build/.dockerignore` with `.dockerignore` and make sure they are the same).

    - `cd ../../ && docker-compose build`

        > **NOTE:** This command will build kippa's docker images. To make sure they were built successfully, run the command `docker images` and make sure `web`, `web-services` and `db` are listed.

5. By now you have two choices, depending on your use case:

    - If you want to run Kippa Aduma on the build computer, run `docker-compose up`, and Kippa Aduma should be available on `http://localhost`.

    - If you want to run Kippa Aduma on a different computer:
        - export the `web`, `web-services` and `db` images using the _`docker save`_ syntax.
        - Copy the exported images as well as the `docker-compose.yml` file to the destination computer
        - Install the `Docker Desktop` executable on the destination computer, and load Kippa Aduma's docker images using the _`docker load`_ syntax.
        - Run `docker-compose up` from the folder in which the `docker-compose.yml` file is in.
        - Kippa Aduma should be available on `http://localhost`!
