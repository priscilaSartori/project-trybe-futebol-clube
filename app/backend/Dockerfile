FROM node:16.14-alpine
WORKDIR /app-backend
EXPOSE 3001
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]