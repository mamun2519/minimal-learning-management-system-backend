
#Stage 1
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install ALL dependencies (including devDependencies for build)
RUN npm ci
COPY . .
RUN npm run build

#Stage 2
FROM node:18-alpine AS runner
WORKDIR /app

# Install ONLY production dependencies
RUN npm ci --only=production
# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create uploads directory
RUN mkdir -p uploads

EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
CMD ["npm", "start"]