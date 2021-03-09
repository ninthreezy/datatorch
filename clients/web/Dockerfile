FROM node:alpine AS base


COPY . /dt
WORKDIR /dt
RUN yarn install --immutable

WORKDIR /dt/clients/web
RUN yarn build

FROM node:alpine AS production
ENV NODE_ENV=production

RUN yarn set version berry

COPY clients/web/package.json /dt/web
COPY yarn.lock /dt/app
COPY .yarnrc.yml /dt/app
COPY .yarn /dt/app
COPY clients/web/next.config.js /dt/web

RUN yarn install --immutable --inline-builds
COPY --from=build /app/clients/web/.next /dt/web/.next

EXPOSE 3000
CMD ["yarn", "start"]
ENV NODE_ENV=production

HEALTHCHECK CMD ["curl", "localhost:3000"]
