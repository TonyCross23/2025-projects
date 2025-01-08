FROM node:22
WORKDIR /app
COPY  package*.json .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm install nodemon
COPY  . ./
ENV PORT 3000
EXPOSE $PORT
CMD [ "pnpm","run","dev"]
