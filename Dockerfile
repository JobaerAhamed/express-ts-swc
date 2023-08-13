FROM node:20-alpine as baseimage
RUN apk add --no-cache libc6-compat

FROM baseimage as builder
WORKDIR /app
COPY package*.json nest-cli.json tsconfig*.json ./
RUN npm ci
COPY src ./src
RUN npm run build
RUN rm -rf node_modules && npm install --production

FROM baseimage as production
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

LABEL org.opencontainers.image.source=https://github.com/JobaerAhamed/express-ts-swc
LABEL org.opencontainers.image.description="Express.js server in Typescript and SWC"
LABEL org.opencontainers.image.licenses=MIT

EXPOSE 8080
CMD ["node", "dist/main"]
