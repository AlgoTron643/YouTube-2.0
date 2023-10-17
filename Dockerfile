# Stage-1: Build react app first

# Use an official Node.js runtime as the base image
FROM node:lts-alpine as build
# Set the working directory inside the container
WORKDIR /usr/src/app
# Copy the package.json and package-lock.json to the container
COPY package*.json ./
# Set environment variables from the .env file
COPY .env .env
# Set the PATH environment variable to include Node.js package executables
ENV PATH /app/node_modules/.bin:$PATH
# Install app dependencies using npm
RUN npm install
# Copy the source code and public folder into the container
COPY src/ ./src/
COPY public/ ./public/
# Additional steps to build your application (modify this part based on your specific build process)
RUN npm run build

# Stage-2: Build the final image and copy the React build files
FROM nginx:1.21.4-alpine
# Copy the React build files from the build stage
COPY --from=build usr/src/app/build /usr/share/nginx/html
# Remove the default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy your NGINX configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/
# Expose port 80
EXPOSE 80
# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]