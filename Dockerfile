FROM node:7.10.0-alpine
RUN mkdir -p /data
WORKDIR /data
COPY ./seeds /data/seeds
COPY ./migrations /data/migrations
COPY ./src /data/src
COPY ./package.json /data
RUN npm install --production
EXPOSE 5000
CMD [ "node", "src/entry" ]
