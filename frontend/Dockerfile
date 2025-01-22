# # Build stage
# FROM node:20-alpine AS builder
#
# # Install pnpm
# RUN npm install -g pnpm
# #RUN corepack enable && corepack prepare pnpm@latest --activate
#
# # Set working directory
# WORKDIR /app
#
# # Copy package files
# COPY package.json pnpm-lock.yaml ./
#
# # Install all dependencies (including dev dependencies needed for build)
# RUN pnpm install --frozen-lockfile
#
# # Copy source files
# COPY . .
# # Build the application with environment variables
# # Note: VITE_ prefix is required for client-side exposure
# ARG VITE_API_URL
# ENV VITE_API_URL=${VITE_API_URL}
# # Build the application
# RUN pnpm build
#
# # Clean node_modules and install only production dependencies
# RUN rm -rf node_modules && pnpm install --frozen-lockfile --prod
#
# # Production stage
# FROM nginx:stable-alpine
#
# # Copy built files from the builder stage to Nginx's web directory
# COPY --from=builder /app/dist /usr/share/nginx/html
#
# # Copy a custom Nginx configuration file (if needed)
# # COPY nginx.conf /etc/nginx/nginx.conf
#
# # Expose the default HTTP port
# EXPOSE 80
#
# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]
# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the application with environment variables
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install simple static file server
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Use non-root user for better security
USER node

EXPOSE 80

# Start static file server
CMD ["serve", "-s", "dist", "-l", "80"]
