# Build with TypeScript
FROM tsc:latest as builder
COPY . .
RUN tsc && \
  rm -rf node_modules

# Use alpine for smaller image size
FROM node:8-alpine

# Use production environments
ENV NODE_ENV production
ENV PORT=3000

# Install node modules
COPY package.json /tmp/package.json
RUN npm config set registry https://registry.npmjs.org/ && \
  cd /tmp && \
  npm i --production --quiet --depth 0 --no-shrinkwrap --unsafe-perm && \
  cd / && \
  npm i --production -g --quiet --depth 0 modclean && \
  modclean -r -D /tmp/node_modules && \
  npm r -g --quiet modclean && du -ms . && \
  mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app/ && \
  rm -rf /tmp

# Set working dir
WORKDIR /usr/app/

# Source
COPY --from=builder /usr/app .

# HTTP port, default to 3000
EXPOSE $PORT

# Start app
CMD ["node", "index.js"]