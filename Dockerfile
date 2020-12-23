FROM node:12-alpine
WORKDIR /socket
COPY package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]
