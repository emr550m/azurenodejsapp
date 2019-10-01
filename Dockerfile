FROM node:latest

WORKDIR /usr/src/app
COPY . .
RUN ["npm", "install","--unsafe-perm"]
EXPOSE 8080
EXPOSE 27017
ENV CUSTOMCONNSTR_mongoConnection "mongodb://mongoapp:27017"
ENTRYPOINT ["npm", "start"]
