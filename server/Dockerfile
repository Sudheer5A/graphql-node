# Use the official Node.js image
FROM node:16.0.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of your application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the app using PM2
CMD ["pm2-runtime", "start", "server.js", "--name", "books-app"]
