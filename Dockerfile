FROM node:alpine
RUN mkdir -p /home/app && chown -R node:node /home/app
USER node

WORKDIR /home/app/
COPY --chown=node:node . .
WORKDIR /home/app/client
RUN npm install
RUN npm run build

WORKDIR /home/app/server
RUN npm install
ARG APP_PORT

EXPOSE ${APP_PORT}
CMD ["node","index.js"]