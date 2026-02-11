FROM node:18

WORKDIR /app

ARG REACT_APP_API_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN REACT_APP_API_URL=$REACT_APP_API_URL npm run build

EXPOSE 3000

CMD ["npm", "start"]
