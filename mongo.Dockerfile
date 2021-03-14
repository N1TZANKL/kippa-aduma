FROM mongo:4.4.4-bionic
WORKDIR /data
COPY /deployment/scripts/etc/mongod-keyfile ./
RUN chmod 400 mongod-keyfile
RUN chown mongodb mongod-keyfile