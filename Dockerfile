FROM node:lts-alpine as build-stage
USER node
WORKDIR /app

ARG VITE_BACKEND_BASE_URL
ENV VITE_BACKEND_BASE_URL=${VITE_BACKEND_BASE_URL:-http://localhost:8090/}

COPY ./bookit-front/package*.json ./
RUN npm install --ignore-scripts

COPY ./bookit-front/ ./
RUN npm run build

FROM node:lts-alpine as production-stage
USER node
WORKDIR /app
COPY --from=build-stage /app .

CMD ["npm", "run", "dev", "--", "--host"]
