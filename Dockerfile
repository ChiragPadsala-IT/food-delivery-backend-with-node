FROM node:0-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE 8080

CMD [ "npm", "start" ]