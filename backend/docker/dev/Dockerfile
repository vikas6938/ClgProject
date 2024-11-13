FROM node:20.9.0-alpine

ENV NODE_ENV=dev

WORKDIR /app

COPY package*.json ./

RUN npm i --ignore-scripts

COPY . .

EXPOSE 8000

CMD [ "node","src/server.js" ]

# docker build -t capshare_test_prod_image -f docker/prod/Dockerfile .