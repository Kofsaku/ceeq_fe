FROM node:20-alpine AS base
WORKDIR /app
COPY package.json .
RUN apk add --no-cache git \
    && yarn install \
    && yarn cache clean

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN apk update && \
    apk add --no-cache curl && \
    curl -sf https://gobinaries.com/tj/node-prune | sh && \
    yarn build && \
    rm -rf node_modules && \
    yarn install --omit=dev --ignore-scripts --prefer-offline && \
    node-prune

FROM node:20-alpine AS final
ENV LANG=ja_JP.UTF-8
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk update && \
    apk add --no-cache curl bash busybox-extras
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY public ./public

EXPOSE 3000
CMD ["yarn", "start"]
