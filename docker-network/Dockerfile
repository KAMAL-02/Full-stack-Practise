FROM node:18

# Create app directory in container
WORKDIR /app 

# Copy package.json and package-lock.json to container
COPY package.json .
RUN npm install

# Copy all files to container
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]