FROM node:latest

WORKDIR /usr/src/app
COPY . .
RUN npm i
EXPOSE 8080
EXPOSE 27017
ENV CUSTOMCONNSTR_mongoConnection "mongodb://mongoserver:27017"
ENTRYPOINT ["npm", "start"]
