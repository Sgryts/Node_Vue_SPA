FROM node:14-alpine AS base
WORKDIR /app
RUN mkdir -p /app/prod-build
COPY client/ ./client
RUN cd /app/client && npm install && npm run build:dev
COPY server/ ./server
RUN cd /app/server && npm install && npm run build
RUN mv /app/client/dist /app/prod-build/
RUN mv /app/server/dist/* /app/prod-build/
RUN rm -rf /app/client && rm -rf /app/server

FROM node:14-alpine AS prod
WORKDIR /app
COPY --from=base /app/prod-build .
RUN npm install && npm cache clean --force
# EXPOSE 8080
# CMD ["npm","start"]

# FROM base AS prod
# COPY /app/prod-build .
# RUN npm install --production && npm cache clean --force
# EXPOSE 3000
# CMD ["npm","start"]


# P0l0sk@L3nt@