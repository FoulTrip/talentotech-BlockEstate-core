# BlockEstate - Plataforma de Tokenización Inmobiliaria

BlockEstate es una plataforma innovadora que permite la tokenización de propiedades inmobiliarias, democratizando el acceso a inversiones en bienes raíces mediante la fragmentación de propiedades en tokens digitales.

## 🏗️ Características Principales

- **Tokenización de Propiedades**: Convierte propiedades físicas en tokens digitales
- **Inversión Fraccionada**: Permite a inversionistas adquirir fracciones de propiedades
- **Distribución Inteligente**: 60% propietario del terreno, 40% pool de constructores
- **Gestión de Construcción**: Seguimiento detallado de fases constructivas con presupuestos
- **Sistema de Rentas**: Gestión automática de ingresos por alquiler y dividendos
- **Ecosistema Integrado**: Conexión con plataformas de pago, blockchain y verificación
- **Notificaciones en Tiempo Real**: Sistema de alertas para inversores
- **Preparado para Blockchain**: Arquitectura híbrida off-chain/on-chain

## 📊 Modelo de Negocio

```
Propietario Terreno (60%)
├── Retiene mayoría de tokens
├── Sin inversión de capital inicial
└── Recibe beneficios proporcionales

Pool Constructor (40%)
├── Financia construcción
├── Recibe tokens graduales por fase
└── Obtiene retorno de inversión
```

## 🗄️ Estructura de Base de Datos

### Modelos Principales

- **User**: Gestión de usuarios con roles y wallets opcionales
- **Property**: Propiedades tokenizadas con blockchain opcional
- **Investment**: Registro de inversiones con tracking de ROI
- **Transaction**: Historial completo de transacciones financieras
- **ConstructionPhase**: Fases de construcción con presupuestos y progreso
- **Ecosystem**: Integraciones con servicios externos
- **BlockchainSync**: Sincronización futura con contratos inteligentes
- **PlatformConfig**: Configuración global de la plataforma
- **Notification**: Sistema de notificaciones para usuarios

## 🚀 Tecnologías

- **Base de Datos**: MongoDB
- **ORM**: Prisma
- **Lenguaje**: TypeScript/JavaScript
- **Arquitectura**: Híbrida (Off-chain + Blockchain ready)
- **Blockchain**: Preparado para Ethereum, Polygon, Binance Smart Chain

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- MongoDB (v6 o superior)
- npm o yarn

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/blockestate.git
cd blockestate

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

## 🔧 Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="mongodb://localhost:27017/blockestate"

# JWT (opcional)
JWT_SECRET="tu-secret-key"

# Blockchain (opcional - para futuro)
BLOCKCHAIN_NETWORK="polygon"
INFURA_API_KEY="tu-infura-key"
CONTRACT_ADDRESS=""

# Servicios externos (opcional)
PAYMENT_GATEWAY_KEY=""
KYC_PROVIDER_KEY=""
```

## 🏃 Ejecutar el Proyecto

```bash
# Generar cliente de Prisma
npx prisma generate

# Sincronizar base de datos
npx prisma db push

# Ver base de datos en Prisma Studio
npx prisma studio

# Ejecutar en desarrollo
npm run dev
```

## 📐 Arquitectura del Sistema

### 🔄 Arquitectura Híbrida Off-Chain/On-Chain

```
┌─────────────────────────────────────────┐
│       OFF-CHAIN (MongoDB - Actual)      │
├─────────────────────────────────────────┤
│ ✓ Perfiles de usuario y KYC            │
│ ✓ Detalles de propiedades e imágenes   │
│ ✓ Historial de transacciones           │
│ ✓ Fases de construcción                │
│ ✓ Búsquedas y analytics                │
│ ✓ Notificaciones                       │
│ ✓ Cache de datos blockchain            │
└──────────────┬──────────────────────────┘
               │
               │ Sincronización (Futuro)
               │
┌──────────────▼──────────────────────────┐
│     ON-CHAIN (Blockchain - Futuro)      │
├─────────────────────────────────────────┤
│ ○ Ownership de tokens (ERC-1155)       │
│ ○ Transferencias de tokens             │
│ ○ Distribución automática (60/40)      │
│ ○ Pagos de dividendos                  │
│ ○ Escrow de fondos                     │
│ ○ Registro inmutable de propiedades    │
└─────────────────────────────────────────┘
```

**Estado actual**: ✓ Funcionando 100% off-chain
**Roadmap**: ○ Blockchain en desarrollo

## 🔄 Flujo de Tokenización

1. **Registro**: Propietario registra terreno en la plataforma
2. **Evaluación**: Equipo valida y aprueba la propiedad
3. **Tokenización**: Generación de tokens (60/40)
   - 60% asignados al propietario del terreno
   - 40% al pool de constructores
4. **Funding**: Inversores compran tokens del pool
5. **Construcción**: Liberación de fondos por fases
6. **Gestión**: Alquiler y distribución de beneficios
7. **ROI**: Dividendos distribuidos según tokens poseídos

## 📈 Estados de Propiedad

| Estado | Descripción |
|--------|-------------|
| `PENDING` | Propiedad en revisión inicial |
| `APPROVED` | Aprobada para tokenización |
| `TOKENIZING` | Generando tokens digitales |
| `TOKENIZED` | Tokens generados y asignados |
| `FUNDING` | Buscando inversores |
| `FUNDED` | Inversión completa alcanzada |
| `CONSTRUCTION` | En proceso de construcción |
| `COMPLETED` | Construcción finalizada |
| `RENTING` | Generando ingresos por renta |
| `SOLD` | Propiedad vendida |
| `CANCELLED` | Proyecto cancelado |

## 🔐 Roles de Usuario

- **INVESTOR**: Usuario que invierte en tokens de propiedades
- **OWNER**: Propietario de terreno que tokeniza su propiedad
- **ADMIN**: Administrador de la plataforma con acceso completo

## 🎯 Tipos de Transacción

| Tipo | Descripción |
|------|-------------|
| `TOKEN_PURCHASE` | Compra inicial de tokens |
| `TOKEN_SALE` | Venta de tokens en mercado secundario |
| `RENTAL_INCOME` | Ingresos recibidos por alquiler |
| `SALE_PROFIT` | Ganancia por venta de propiedad |
| `CONSTRUCTION_PAYMENT` | Pago liberado para construcción |
| `DIVIDEND` | Dividendos distribuidos a inversores |
| `REFUND` | Reembolso de inversión |
| `FEE` | Comisión de la plataforma |

## 🔗 Preparación para Blockchain

### Campos Blockchain en el Schema

Todos los modelos principales incluyen campos opcionales para blockchain:

```prisma
model Property {
  // Campos blockchain (opcionales)
  contractAddress   String?  @unique
  tokenId           String?
  blockchainNetwork String?
  txHash            String?
  onChain           Boolean  @default(false)
  lastSyncedAt      DateTime?
}
```

### Migración Futura a Blockchain

Cuando los contratos inteligentes estén listos:

```typescript
// 1. Deploy del contrato
const contract = await deployPropertyContract();

// 2. Actualizar base de datos
await prisma.property.update({
  where: { id: propertyId },
  data: {
    contractAddress: contract.address,
    tokenId: tokenId.toString(),
    blockchainNetwork: "polygon",
    txHash: tx.hash,
    onChain: true,
    lastSyncedAt: new Date()
  }
});

// 3. Sincronizar eventos
await syncBlockchainEvents();
```

## 🛠️ Comandos Útiles de Prisma

```bash
# Ver base de datos en interfaz web
npx prisma studio

# Generar cliente después de cambios
npx prisma generate

# Aplicar cambios al schema
npx prisma db push

# Resetear base de datos (¡cuidado en producción!)
npx prisma db push --force-reset

# Ver migraciones
npx prisma migrate status

# Crear seed de datos de prueba
npx prisma db seed
```

## 📊 Modelo de Datos Clave

### Ejemplo de Propiedad Tokenizada

```typescript
{
  id: "uuid",
  title: "Casa Campestre Valle del Cauca",
  totalTokens: 100000,
  tokenPrice: 100, // USD por token
  landOwnerPercent: 60,
  poolPercent: 40,
  status: "TOKENIZED",
  onChain: false // Aún off-chain
}
```

### Ejemplo de Inversión

```typescript
{
  userId: "investor-uuid",
  propertyId: "property-uuid",
  tokensAmount: 1000,
  investmentValue: 100000, // 1000 tokens × $100
  type: "POOL_PORTION", // Del 40% constructor
  totalDividends: 5000, // Ganancia acumulada
  onChain: false
}
```

## 🎨 Integraciones del Ecosistema

| Tipo | Propósito | Estado |
|------|-----------|--------|
| `PAYMENT_GATEWAY` | Pagos con tarjeta/PSE | ✓ Activo |
| `IDENTITY_VERIFICATION` | KYC/Verificación identidad | ✓ Activo |
| `BLOCKCHAIN` | Contratos inteligentes | ○ Desarrollo |
| `REAL_ESTATE_PLATFORM` | Datos de mercado | ✓ Activo |
| `BANK` | Transferencias bancarias | ✓ Activo |
| `NOTARY` | Validación legal | ○ Planeado |

## 📚 Documentación Adicional

- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [KodeChain Smart Contracts](https://docs.kodechain.site/docs/Developers/Smart-Contracts-Overview)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🗺️ Roadmap

### ✅ Fase 1: MVP Off-Chain (Actual)
- [x] Sistema de usuarios y roles
- [x] Gestión de propiedades
- [x] Sistema de inversiones
- [x] Tracking de construcción
- [x] Transacciones financieras
- [x] Sistema de notificaciones

### 🔄 Fase 2: Blockchain Integration (En desarrollo)
- [ ] Contratos inteligentes
- [ ] Integración con wallets (WalletKodeChain)
- [ ] Sincronización automática off-chain/on-chain
- [ ] Sistema de escrow en blockchain
- [ ] Distribución automática de dividendos

### 📋 Fase 3: Escalamiento (Futuro)
- [ ] Mercado secundario de tokens
- [ ] Fraccionalización avanzada
- [ ] DAO para votación de proyectos
- [ ] Integración multi-chain
- [ ] NFTs de propiedades únicas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Equipo

- David Vasquez Mahecha
---

⭐ **Nota importante**: BlockEstate está actualmente funcionando 100% off-chain mientras se desarrollan los contratos inteligentes. Todos los campos blockchain son opcionales y no afectan la funcionalidad actual del sistema.

