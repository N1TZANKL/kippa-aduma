FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/build && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install && npm install next
COPY --chown=node:node . .

WORKDIR /home/node/app/build
ENV NODE_ENV=production
RUN npm run build

EXPOSE 8080
CMD npm run start