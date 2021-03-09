FROM node:lts-alpine AS base
WORKDIR /base
COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build-services

FROM node:lts-alpine AS production
ENV NODE_ENV=production
WORKDIR /services-app
COPY --from=build /build/package*.json ./
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist

CMD ["node", "dist/server/init-services.js"]
