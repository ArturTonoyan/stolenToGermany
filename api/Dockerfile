FROM node:20-alpine

ARG APP_DIR=/var/www/ostarbaiters/api
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3001/tcp
CMD npm start
