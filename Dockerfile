# ---- build ------------------------------------------------------------------
# Compiles the dataset and the app. Nothing from this stage reaches the final
# image except dist/.
FROM node:22-alpine AS build

WORKDIR /app

# Copy manifests first so the dependency layer is cached across code changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# `npm run build` regenerates the dataset skeleton and then builds the site.
# It needs no network: verify:dates is a separate, deliberate step.
RUN npm run build

# ---- serve ------------------------------------------------------------------
# Static files only. No Node in production — the app is a single HTML page plus
# assets, so the final image is a few tens of megabytes instead of hundreds.
FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
