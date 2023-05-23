FROM node:18-alpine

# Set the working directory
WORKDIR ./src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Compile TypeScript into JavaScript
RUN npm run build

# Expose the port
EXPOSE 8080

COPY docker-entrypoint.sh /
RUN chmod +x ./docker-entrypoint.sh

# Run the application
ENTRYPOINT ["./docker-entrypoint.sh"]