# Inscripción Ferias

Sistema web para la gestión digital de inscripciones a ferias municipales. Permite a los feriantes inscribirse a ferias y a los administradores gestionar los cupos y generar listas de selección automáticas según criterios de prioridad.

---

## Requisitos previos

- Node.js 18+
- PostgreSQL
- npm

---

## Instalación

### Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` en `/backend` con las siguientes variables:

```env
DB_HOST=
DB_PORT=5432
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=4000
NODE_ENV=development
```

### Frontend

```bash
cd frontend
npm install
```

Crear un archivo `.env.local` en `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Correr el proyecto

```bash
# Backend
cd backend
npm run dev

# Frontend (en otra terminal)
cd frontend
npm run dev
```

El backend corre en `http://localhost:4000` y el frontend en `http://localhost:3000`.

---

## Estructura del proyecto

```
inscripcion_ferias/
├── backend/
│   └── src/
│       ├── api/          # Rutas, controladores y middlewares
│       ├── domain/       # Lógica de negocio y modelos
│       └── infra/        # Repositorios, entidades y mappers
├── frontend/
│   └── src/
│       ├── app/          # Páginas (Next.js App Router)
│       ├── components/   # Componentes reutilizables
│       └── services/     # Comunicación con la API
└── docs/                 # Documentación del proyecto
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo |
| `npm run build` | Compila el proyecto |
| `npm start` | Inicia el servidor compilado |
| `npm test` | Corre los tests |
| `npm run test:coverage` | Corre los tests con reporte de cobertura |

---

## Documentación

- [`docs/documentacion-tecnica.md`](./docs/documentacion-tecnica.md) — Arquitectura, stack, modelo de datos y lógica de inscripciones.
- [`docs/documentacion-funcional.md`](./docs/documentacion-funcional.md) — Flujos de uso, roles y reglas de negocio.
