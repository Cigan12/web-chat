FROM node:14-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY ./ ./
RUN npm i
RUN npm run build:client
RUN npm run build:server


FROM nginx:alpine as nginx
COPY --from=builder /app/src/client/dist ./var/www/