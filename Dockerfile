 FROM node:18-alpine AS deps
 WORKDIR /app
 COPY package.json package-lock.json* ./
 RUN npm ci
 
 FROM node:18-alpine AS builder
 WORKDIR /app
 COPY . .
 COPY --from=deps /app/node_modules ./node_modules
 RUN npm run build
 
 FROM node:18-alpine AS runtime
 WORKDIR /app
 COPY --from=builder /app .
 EXPOSE 5173
 CMD ["npm", "run", "dev"]