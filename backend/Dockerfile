# Use the official Node.js 20 image as the base image
FROM node:20

# Define the working directory inside the container
WORKDIR /app

# Install the JSON-Server globally in the container
RUN npm install -g json-server

# Copy the database file (db.json) from the host to the container
COPY db.json /app/db.json

# Adjust permissions for the database file to make it writable
RUN chmod 666 /app/db.json

# Expose port 5001 to allow access to the JSON-Server from outside the container
EXPOSE 5001

# Command to start the JSON-Server, watch for changes in db.json, and run on port 5001
CMD ["json-server", "--watch", "/app/db.json", "--port", "5001"]