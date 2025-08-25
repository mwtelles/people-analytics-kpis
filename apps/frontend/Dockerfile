FROM node:22-alpine

WORKDIR /app
COPY ./apps/frontend/package.json ./
RUN npm install

COPY ./apps/frontend ./
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
