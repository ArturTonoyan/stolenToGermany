FROM node:20-alpine

ARG APP_DIR=/var/www/ostarbaiters/web
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

EXPOSE 3000/tcp
CMD npm start