FROM node:12.6.0-alpine

WORKDIR /usr/src/app

COPY . .
RUN npm install

CMD [ "node", "main.js" ]
