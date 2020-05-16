FROM mhart/alpine-node:latest
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
COPY ./client/package.json /usr/src/app/client/package.json
RUN npm install
COPY ./client/.env /usr/src/app/client/.env
COPY ./client/src /usr/src/app/client/src
COPY ./client/public /usr/src/app/client/public
RUN npm run build


WORKDIR /usr/src/app
COPY ./data /usr/src/app/data
RUN mkdir server
WORKDIR /usr/src/app/server
COPY ./server/package.json /usr/src/app/server/package.json
RUN npm install
COPY ./server/app /usr/src/app/server/app
COPY ./server/index.js /usr/src/app/server

ARG APP_PORT

EXPOSE ${APP_PORT}
CMD [ "npm", "start" ]