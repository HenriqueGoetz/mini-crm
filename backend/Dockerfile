FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG DATABASE_URL
RUN DATABASE_URL=$DATABASE_URL 

RUN npm run build

RUN npm run migrate

EXPOSE 3001

CMD ["npm", "run", "start"]
