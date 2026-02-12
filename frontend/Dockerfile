FROM node:18-alpine

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm install

COPY . .

ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}

RUN npm run build

COPY start.sh .
RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]

