FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:22-alpine AS prod
WORKDIR /app

RUN corepack enable

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/db ./db
COPY .sequelizerc ./
COPY package.json pnpm-lock.yaml* ./
COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["./entrypoint.sh"]
