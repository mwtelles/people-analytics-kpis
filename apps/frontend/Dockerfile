FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

ARG VITE_URL
ARG VITE_BACKEND_URL
ARG VITE_API_DOCS_URL

ENV VITE_URL=${VITE_URL}
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_API_DOCS_URL=${VITE_API_DOCS_URL}

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm run build

FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
