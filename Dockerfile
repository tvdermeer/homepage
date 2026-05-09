# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
RUN npm ci --omit=optional

# Copy source and build
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html

# Optional: custom nginx config for SPA behavior
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
