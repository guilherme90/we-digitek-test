FROM node:19

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENTRYPOINT npm start

EXPOSE 3000