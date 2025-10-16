
#Stage 1
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4000
CMD ["npm", "start"]