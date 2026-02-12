FROM node:18-alpine

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm install

COPY . .

ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}

RUN if [ "$BUILD_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

RUN if [ "$BUILD_ENV" = "production" ]; then npm install -g serve && serve -s build -l 3000; else npm start; fi

