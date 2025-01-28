FROM node:18

WORKDIR /app

COPY package.json ./
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/

RUN npm install

COPY client ./client
COPY server ./server

RUN npm run build 

RUN mv ./client/dist ./temp
RUN rm -rf ./client
RUN mkdir ./client && mkdir ./client/dist
RUN mv ./temp ./client/dist

EXPOSE 3000

CMD ["npm", "start"]