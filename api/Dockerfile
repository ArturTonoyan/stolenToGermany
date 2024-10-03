FROM node:20-alpine

WORKDIR /api

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3001/tcp
CMD npm start
