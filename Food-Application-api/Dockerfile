# Stage 1: Build Stage
# Use Node.js version 23 as the base image for building the TypeScript application.
# This image is named 'base' to refer to it in the production stage later.
FROM node:23 AS base

# Set the working directory inside the container to /usr/src/app.
# All subsequent commands will run within this directory.
WORKDIR /usr/src/app

# Set environment variables to configure the Node.js environment.
# NODE_ENV is set to 'development' by default, but it can be overridden at build time.
# NODE_OPTIONS sets the flag '--no-warnings' to suppress Node.js warnings during execution.
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV NODE_OPTIONS="--no-warnings"

# Print the Node.js and npm versions to verify correct setup during the build process.
RUN echo "Node.js version:" && node --version
RUN echo "npm version:" && npm --version

# Copy package.json and package-lock.json files into the container.
# This is necessary to install the dependencies listed in these files.
COPY package*.json ./

# Install all dependencies, including devDependencies, using 'npm ci'.
# The 'ci' command ensures a clean installation of dependencies as specified in the package-lock.json.
RUN npm ci

# Copy the source code and TypeScript configuration files into the container.
# This includes the source code and the tsconfig.json needed to build the app.
COPY ./src ./src
COPY tsconfig.json .

# Build the TypeScript application.
# This will transpile the TypeScript code into JavaScript and generate the output in the 'dist' folder.
RUN npm run build


# Stage 2: Production Stage
# Use Node.js version 23 as the base image for the production environment.
FROM node:23

# Switch to a non-root user 'node' for security reasons, ensuring the application runs with limited privileges.
USER node

# Set the working directory to /usr/src/app in the production container.
WORKDIR /usr/src/app

# Copy necessary files from the build stage (labeled 'base') to the production stage.
# These files include package.json, node_modules, and the compiled JavaScript files in the 'dist' folder.
# This reduces the final image size by excluding unnecessary files.
COPY --from=base /usr/src/app/package.json ./
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/dist ./dist

# Expose port 7000 so the application can be accessed from outside the container.
EXPOSE 7000

# Set the default command to run when the container starts.
# It runs 'npm run start' to start the application in production mode.
CMD ["npm", "run", "start"]
