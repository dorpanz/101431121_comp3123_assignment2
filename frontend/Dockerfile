FROM node:20
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN node -v
CMD ["npm", "start"]