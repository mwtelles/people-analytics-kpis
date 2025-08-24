FROM postgres:17.7-alpine3.21

ENV TZ=UTC

RUN mkdir -p /docker-entrypoint-initdb.d

EXPOSE 5432
