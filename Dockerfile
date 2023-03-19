FROM node:lts-alpine

WORKDIR /app
COPY . /app

RUN rm -f package-lock.json \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm run install


EXPOSE 3000
CMD ["node", "./index.js"]
