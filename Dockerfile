FROM node:6.4

ENV APP_DIR /kails
RUN mkdir $APP_DIR
WORKDIR $APP_DIR
ADD package.json $APP_DIR
RUN npm install
ADD . $APP_DIR

RUN npm run assets_compile

EXPOSE 5000

CMD ["npm", "run", "pm2:docker"]
