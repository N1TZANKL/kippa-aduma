#!/bin/sh

openssl rand -base64 756 > ./deployment/scripts/etc/mongod-keyfile
#chmod 600 ./deployment/scripts/etc/mongod-keyfile