FROM node:11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
#TODO: app's port set to 3030...
EXPOSE 3000

CMD ["npm","start"]