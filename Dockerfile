FROM node:lts-alpine as build-stage
WORKDIR /app

ARG VITE_BACKEND_BASE_URL
ENV VITE_BACKEND_BASE_URL=${VITE_BACKEND_BASE_URL:-http://localhost:8090/}

COPY ./bookit-front/package*.json ./
RUN npm install

COPY ./bookit-front/ ./
RUN npm run build

FROM node:lts-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/package*.json ./
RUN npm install
COPY --from=build-stage /app/dist .

CMD ["npm", "run", "dev", "--", "--host"]
