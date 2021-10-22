FROM node:14.17-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444
CMD [ "ts-node-dev", "--no-deps", "--transpile-only", "./src/server" ]