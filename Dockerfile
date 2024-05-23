# # build stage
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# COPY nginx.conf ./
# RUN npm run serve

# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# ENV BACKEND_API_URL ppon_pub
# RUN sed -i "s|backend_host|$BACKEND_API_URL|g" -i /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

#------------------

# BUILD STAGE
FROM node:20.11.1-alpine as build-stage

## LOG SETTING
# RUN mkdir /logs
# RUN chmod 777 /logs

# LANGUAGE SETTING
ENV LANG ko_KR.UTF-8
ENV LANGUAGE ko_KR:en
ENV LC_ALL ko_KR.UTF-8

# TIMEZONE SETTING
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# COPY package.json package-lock.json .npmrc ./
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# PRODUCTION STAGE
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

ENV BACKEND_API_URL apigw
RUN sed -i "s|backend_host|$BACKEND_API_URL|g" -i /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
