FROM node:20.11.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g node-gyp
RUN npm rebuild bcrypt --build-from-source
RUN npm install
COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]