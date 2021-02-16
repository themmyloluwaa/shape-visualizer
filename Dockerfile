# from base image
FROM node:13.12.0-alpine as builder

# set workdir
WORKDIR /app
# install app dependencies
COPY package.json ./
RUN npm install --silent

COPY . ./

RUN npm run build

FROM nginx

COPY --from=builder /app/build usr/share/nginx/html

