FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && \
    npm cache verify && \
    npm cache clean --force && \
    npm cache verify

COPY . .

RUN addgroup -S appuser && adduser -S appuser -G appuser
USER appuser

ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "npx sequelize-cli db:migrate && node app.js"]

