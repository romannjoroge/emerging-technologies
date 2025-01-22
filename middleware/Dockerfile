FROM node:20-alpine
WORKDIR /middleware
RUN apk add --no-cache python3 py3-pip gcc make alpine-sdk sqlite
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm i -g pnpm
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]
