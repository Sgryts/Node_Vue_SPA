FROM node:14 as client-build
WORKDIR /usr/src/app
COPY client .
RUN npm install && npm run build

FROM node:14 as server-build
WORKDIR /root/
COPY --from=client-build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install 
COPY . .

EXPOSE 3000

CMD ["npm","start"]
