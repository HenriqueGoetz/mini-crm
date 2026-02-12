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

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["sh", "entrypoint.sh"]
