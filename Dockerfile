# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching layer)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose the port you use
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
