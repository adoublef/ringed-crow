ARG BUN_VERSION=1.0.4

FROM oven/bun:${BUN_VERSION} AS deploy

WORKDIR /opt

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY . .
# COPY public public

ENV NODE_ENV production
CMD ["bun", "run", "start"]

EXPOSE 8000