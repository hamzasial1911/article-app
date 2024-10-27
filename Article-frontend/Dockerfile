# Frontend Dockerfile

# Use an official Node.js image as the base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the frontend package.json and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the frontend code into the container
COPY . .

# Expose the frontend port (usually 3000)
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "run", "start"]
