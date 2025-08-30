# 1. Билдим приложение
FROM node:20-alpine AS builder
WORKDIR /app

# Установим зависимости
COPY package*.json ./
RUN npm install

# Скопируем весь проект и соберём Nitro
COPY . .
RUN npm run build

# 2. Финальный образ для запуска
FROM node:20-alpine AS runner
WORKDIR /app

# Скопируем только собранное Nitro + нужные модули
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Nitro по умолчанию запускается через .output/server/index.mjs
CMD ["node", ".output/server/index.mjs"]
