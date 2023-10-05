ARG BUN_VERSION=1.0.4

FROM oven/bun:${BUN_VERSION} AS build
WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

# ? --------------------------------

FROM gcr.io/distroless/cc AS final
WORKDIR /app

COPY --from=build /usr/local/bin/bun bun
COPY --from=build /app/node_modules node_modules

COPY . .
COPY tsconfig.json .

ENV NODE_ENV production
CMD ["./bun", "cmd/ringed-crow/index.ts"]

EXPOSE 8000