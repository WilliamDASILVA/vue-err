FROM node:10

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

CMD ["npm", "start"]
