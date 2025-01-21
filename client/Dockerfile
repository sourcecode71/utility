# Step 1: Build the Angular application
FROM node:18 AS build

# Set the working directory to /src in the container
WORKDIR /src

# Copy the package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire client directory into the container's /src directory
COPY . .

# Build the Angular application for production
RUN npm run build --prod

# Step 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Copy the built Angular application from the 'build' stage into Nginx's public directory
COPY --from=build /src/dist/client/browser /usr/share/nginx/html

# Expose port 80 to allow traffic to the app
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
