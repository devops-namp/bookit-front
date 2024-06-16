FROM node:lts-alpine as build-stage
USER node
WORKDIR /app

RUN ls -la

ARG VITE_BACKEND_BASE_URL
ENV VITE_BACKEND_BASE_URL=${VITE_BACKEND_BASE_URL:-http://localhost:8090/}

COPY --chown=node:node ./bookit-front/package*.json ./

RUN pwd
RUN ls -la

RUN npm install --ignore-scripts

RUN ls -la

COPY --chown=node:node ./bookit-front/ ./
RUN npm run build

RUN ls -la

FROM node:lts-alpine as production-stage
USER node
WORKDIR /app
COPY --from=build-stage /app .
RUN ls -la

CMD ["npm", "run", "dev", "--", "--host"]
