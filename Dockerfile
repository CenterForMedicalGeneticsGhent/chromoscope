# Start from node image
FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
# COPY package.json yarn.lock ./
COPY package.json ./

# Install dependencies
# RUN yarn install

# Copy source code
COPY . .

# Expose port 3000 and 4173
EXPOSE 3000
EXPOSE 4173

RUN apt-get update && \
    apt-get install -y bats

# Start the app
CMD yarn install && \
    yarn link && \
    yarn start --host