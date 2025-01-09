FROM node:22
WORKDIR /app
COPY  package*.json .
RUN npm install -g pnpm
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "developement" ]; \
        then pnpm install && pnpm add nodemon --save-dev; \
        else pnpm install --production; \
        fi
  COPY  . ./
ENV PORT 3000
EXPOSE $PORT
CMD [ "node","index.js"]
