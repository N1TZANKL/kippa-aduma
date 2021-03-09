## Table of Contents

-   [Gather Pre-requisites](#gather-pre-requisites)
-   [Build Steps](#build-steps)

## Gather Pre-requisites

<br/>

1. Download Kippa Aduma's source code, either by cloning the project using `git` or downloading the source code as a zip.

2. Download Kippa Aduma's entire library dependencies - as specified in [package.json](../../package.json). To download zipped versions of the libraries use `yarn`. You can also run `npm install` from the source code's root folder and copy the `node_modules` folder.

3. Download the base docker images - as specified in [Dockerfile](Dockerfile), [services.Dockerfile](services.Dockerfile) and [mongo.Dockerfile](../../mongo.Dockerfile).

    To download a docker image, run: `docker pull <image-tag>`.

    To export the docker image, run: `docker save -o <output-file-name>.tar <image-tag>`

## Build Steps

<br />

**Host requirements:**

-   Docker + Docker-Compose

Steps:

1.
