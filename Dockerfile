FROM node:14 AS client-build
RUN apt-get update
RUN npm cache clean --force
RUN npm i -g npm
# RUN npm install -g gulp-cli
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/prod-build
COPY client/ ./client
RUN cd /usr/src/app/client && npm install && npm run build
COPY server/ ./server
RUN cd /usr/src/app/server && npm install && npm run build

RUN mv /usr/src/app/client/dist /usr/src/app/prod-build/
RUN mv /usr/src/app/server/dist/* /usr/src/app/prod-build/

FROM node:14 AS server-build
WORKDIR /root/
COPY --from=client-build /usr/src/app/prod-build .
RUN npm install --production

EXPOSE 3000

CMD ["npm","start"]
