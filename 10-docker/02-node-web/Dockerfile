FROM node:26-alpine

WORKDIR /app

# copiamos el archivo server.js y el package.json juntos
COPY package*.json .

# instalamos las dependencias
RUN npm install

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]