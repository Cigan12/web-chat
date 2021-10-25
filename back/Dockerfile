FROM node:14-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build
EXPOSE 3001

CMD ["node", "dist/main"]