# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies (NEW FLAG)
RUN npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules


# Create uploads directory
RUN mkdir -p uploads logs




# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Start application--
CMD ["node", "dist/server.js"]