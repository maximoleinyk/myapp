FROM node:latest

ENV SERVICE_PORT 7000
ENV SERVICE_HOST 0.0.0.0

WORKDIR /workspace
COPY . /workspace

RUN npm install
RUN npm run build

EXPOSE 7000

CMD npm run start
