FROM node:lts-alpine AS base
WORKDIR /base
COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:lts-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/node_modules ./node_modules

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]