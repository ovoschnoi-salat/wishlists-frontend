FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

#ARG REACT_APP_API_ADDR_ARG
#ENV REACT_APP_API_ADDR=$REACT_APP_API_ADDR_ARG

RUN npm run build

FROM nginx:latest AS production

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]