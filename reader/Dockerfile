# The comic reader service.
#
# Built from the repository root, not from reader/, because the indexer reads
# data/series.js and data/library.js — the same hand-curated layers the site
# uses, so the two can never disagree about what a series is called.
#
# No npm install: the service uses only Node builtins plus bsdtar. That is a
# deliberate constraint rather than an accident — a page server that ships no
# third-party code is one that never needs a dependency audit.
FROM node:22-alpine

# libarchive reads RAR3 and RAR5 and is free software, which p7zip's RAR
# decoder is not; a third of the shelf is .cbr, so this is not optional.
RUN apk add --no-cache libarchive-tools

WORKDIR /app

COPY reader/ ./reader/
COPY data/series.js data/library.js data/collections.js ./data/

# Extracted rar pages live here. Created before dropping privileges so that a
# fresh named volume inherits the ownership and the service can write to it.
RUN mkdir -p /cache && chown -R node:node /cache

ENV COMICS_DIR=/comics \
    CACHE_DIR=/cache \
    PORT=8787 \
    NODE_ENV=production

USER node
EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8787/api/health >/dev/null 2>&1 || exit 1

CMD ["node", "reader/server.mjs"]
