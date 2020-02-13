FROM node:8.12.0-alpine

# build --build-arg GitHub access token

# run --env Running PORT
ARG PORT=8080
ENV PORT=${PORT}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/

# pm2 runtime support
RUN npm install -g pm2
RUN npm install -g yarn

# RUN npm install
RUN yarn install

# Bundle app source
COPY . /usr/src/app/

EXPOSE ${PORT}

CMD ["pm2-runtime", "pm2-app-config.json"]

