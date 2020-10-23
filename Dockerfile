# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
	echo "Asia/Shanghai" > /etc/timezone
    
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY ./dependence_visual/dist/ /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/pass_file /etc/nginx/pass_file

COPY ./certification /etc/nginx/letsencrypt/live/archguard.org
