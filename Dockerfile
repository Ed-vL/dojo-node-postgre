FROM node:13-alpine
RUN apk update && apk add bash

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm i nodemon -g

COPY ./ /app

ENTRYPOINT ["npm","run","start-dev"]

EXPOSE 3000
