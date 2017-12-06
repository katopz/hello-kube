# Use alpine for smaller image size
FROM node:8-alpine

# Use production environments
ENV NODE_ENV production

RUN npm i -g typescript

# Set working dir
WORKDIR /usr/app/

COPY . .
RUN npm i &&\
  rm -f package-lock.json &&\
  rm -f package.json

ENTRYPOINT ["tsc"]

CMD ["--version"]