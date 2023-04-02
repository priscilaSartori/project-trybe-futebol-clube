FROM node:16.14-alpine
WORKDIR /app-frontend
EXPOSE 3000
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
ENTRYPOINT ["npm", "start"]