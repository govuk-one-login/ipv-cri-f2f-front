FROM --platform="linux/arm64" arm64v8/node:20.18.2-alpine3.21@sha256:ca79c9f7be0fd2d07a479d71b38e9bcbae1458151f29003af33f6f61fb2113bf AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY /src ./src

RUN ["apk", "--no-cache", "upgrade"]
RUN ["apk", "add", "--no-cache", "tini"]
RUN yarn install
RUN yarn build

# 'yarn install --production' does not prune test packages which are necessary
# to build the app. So delete nod_modules and reinstall only production packages.
RUN [ "rm", "-rf", "node_modules" ]
RUN yarn install --production --frozen-lockfile

FROM --platform="linux/arm64" arm64v8/node:20.18.2-alpine3.21@sha256:ca79c9f7be0fd2d07a479d71b38e9bcbae1458151f29003af33f6f61fb2113bf AS final

RUN ["apk", "--no-cache", "upgrade"]
RUN ["apk", "add", "--no-cache", "tini"]

WORKDIR /app

# Copy in compile assets and deps from build container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/src ./src


ENV PORT 8080
EXPOSE $PORT

ENTRYPOINT ["tini", "--"]

CMD ["yarn", "start"]
