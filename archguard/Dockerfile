FROM node:16-alpine as build
# the webpack version used here have problem with node > 10: https://github.com/webpack/webpack/issues/14532
WORKDIR /app
RUN apk add --update alpine-sdk python3
COPY package*.json nginx.conf ./
RUN yarn install
COPY . .
# RUN npx browserslist@latest --update-db
RUN export NODE_OPTIONS=--max_old_space_size=8192 && yarn build
CMD ["yarn", "run"]

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
