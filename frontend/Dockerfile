# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm
#RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN pnpm build

# Clean node_modules and install only production dependencies
RUN rm -rf node_modules && pnpm install --frozen-lockfile --prod

# Production stage
FROM nginx:stable-alpine

# Copy built files from the builder stage to Nginx's web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file (if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the default HTTP port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
