# Use the official Node.js 20 image as the base
# This provides a clean and standardized environment with Node.js pre-installed.
FROM node:20

# Set the working directory inside the container to `/app`
# All subsequent commands will run relative to this directory.
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
# These files are necessary to install project dependencies.
COPY package*.json ./

# Install project dependencies
# Using `npm install` ensures that all required packages are downloaded and set up.
RUN npm install

# Copy all the source code from the current directory to the container
# This includes application code, configuration files, and any other resources.
COPY . .

# Define the command to run the application
# The `npm start` script (defined in package.json) will launch the application.
CMD ["npm", "start"]