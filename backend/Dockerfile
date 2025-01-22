FROM node:20-alpine
WORKDIR /backend
RUN apk add --no-cache python3 py3-pip gcc make alpine-sdk 
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm i -g pnpm
RUN pnpm install
COPY . .
EXPOSE 5000
CMD ["pnpm", "dev"]
