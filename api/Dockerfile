FROM node:20.11.1
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3001

CMD npm run dev
