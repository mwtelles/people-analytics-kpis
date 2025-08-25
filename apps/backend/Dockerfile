FROM node:22-alpine

WORKDIR /app
COPY ./apps/backend/package.json ./
RUN npm install

COPY ./apps/backend ./
RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "start"]
