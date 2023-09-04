FROM node:18.12.1-alpine

USER root

WORKDIR /frontend
COPY package*.json yarn.lock /frontend/

RUN yarn install --ignore-platform

ENV REACT_APP_HOST_IP_ADDRESS $API_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

COPY . /frontend/

CMD ["yarn", "dev"]