FROM node:8.2

# Copy the application sources
COPY . /var/www/node-app

# Build the application
RUN cd /var/www/node-app && make

# Start the application
CMD cd /var/www/node-app && make serve
