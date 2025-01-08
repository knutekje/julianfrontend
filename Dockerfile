
# Stage 1: Build the React Vite app
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Pass environment variables during build
ARG VITE_API_AUTH
ARG VITE_API_ROOM
ARG VITE_API_BOOKING
ENV VITE_API_AUTH=$VITE_API_AUTH
ENV VITE_API_ROOM=$VITE_API_ROOM
ENV VITE_API_BOOKING=$VITE_API_BOOKING


# Stage 2: Serve the app using Nginx
FROM nginx:stable-alpine

# Copy SSL certificates into the container
COPY ssl/localhost.crt /etc/nginx/ssl/localhost.crt
COPY ssl/localhost.key /etc/nginx/ssl/localhost.key



# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app to Nginx's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html



# Start Nginx
CMD ["nginx", "-g", "daemon off;"]