FROM node:18 AS build

WORKDIR /app

COPY package.json ./
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/

RUN npm install

COPY client ./client

WORKDIR /app/client

RUN npm run build

FROM node:18

WORKDIR /app

COPY package.json ./
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/

RUN npm install

COPY server ./server
COPY --from=build /app/client/dist ./client/dist

WORKDIR /app/server

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]