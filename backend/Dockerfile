FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}

EXPOSE 3001

CMD sh -c "npm run migrate && if [ \"$BUILD_ENV\" = \"production\" ]; then npm run start; else npm  run dev; fi"
