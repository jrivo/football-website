FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN yarn
# COPY . /app
CMD ["yarn", "start"]