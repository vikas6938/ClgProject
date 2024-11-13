FROM node:20.9.0-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

EXPOSE 8000

CMD [ "node","src/server.js" ]

# docker build -t capshare_test_prod_image -f docker/prod/Dockerfile .