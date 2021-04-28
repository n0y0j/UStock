FROM node:14.15.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package*.json ./

RUN npm install --lagacy-peer-deps

COPY . .

CMD ["npm", "start"]