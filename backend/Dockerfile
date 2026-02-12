FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

COPY start.sh .
RUN chmod +x start.sh

ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}

EXPOSE 3001

CMD ["./start.sh"]
