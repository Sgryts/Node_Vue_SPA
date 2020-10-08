FROM node:14 AS client-build
RUN apt-get update
RUN npm cache clean --force
RUN npm i -g npm
RUN npm install -g gulp-cli
WORKDIR /usr/src/app
COPY client/ ./client
COPY server/ ./server
RUN cd /usr/src/app/client && npm install
RUN cd /usr/src/app/server && npm install && gulp

FROM node:14 AS server-build
WORKDIR /root/
COPY --from=client-build /usr/src/app/prod-build .
# COPY package*.json ./
RUN npm install --production
# COPY . .

EXPOSE 3000

CMD ["npm","start"]
