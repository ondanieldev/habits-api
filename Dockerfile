FROM node:18-alpine

ARG APP_PORT=3000

WORKDIR /api

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE $APP_PORT

CMD ["yarn", "start:prod"]
