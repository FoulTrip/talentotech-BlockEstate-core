# ========================================
# Stage 1: Build
# ========================================
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para Prisma)
RUN npm ci

# Copiar el esquema de Prisma
COPY prisma ./prisma/

# Generar el cliente de Prisma
RUN npx prisma generate

# Copiar el código fuente
COPY . .

# ========================================
# Stage 2: Production
# ========================================
FROM node:20-alpine AS production

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar el cliente de Prisma generado desde el stage de build
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copiar el esquema de Prisma (necesario para algunas operaciones)
COPY --chown=nodejs:nodejs prisma ./prisma/

# Copiar el código fuente
COPY --chown=nodejs:nodejs src ./src/
COPY --chown=nodejs:nodejs main.js ./
COPY --chown=nodejs:nodejs swagger.json ./

# Cambiar al usuario no-root
USER nodejs

# Exponer el puerto de la aplicación
EXPOSE 3000

# Variables de entorno por defecto (pueden ser sobrescritas)
ENV NODE_ENV=production
ENV PORT=3000

# Healthcheck para monitoreo
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/docs', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init para un manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]

# Comando para ejecutar la aplicación
CMD ["node", "main.js"]
