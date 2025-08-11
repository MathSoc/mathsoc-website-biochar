# Use Node.js 22
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 9000
EXPOSE 9000

# Set environment variables
ENV PORT=9000
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
