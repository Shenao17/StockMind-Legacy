# StockMind Legacy — Sistema Inteligente de Gestión de Inventario y Predicción de Demanda

> **Versión Legacy — Última versión: v1.2.0**
>
> Plataforma web académica para la gestión de inventario y ventas con analítica predictiva integrada.
>
> Este repositorio corresponde a la **versión Legacy de StockMind**. El desarrollo principal del proyecto continúa en una nueva implementación orientada a contenedores y despliegue reproducible.

---

## 📌 Estado del proyecto

**StockMind Legacy** representa una versión anterior y funcional del sistema original.

Este repositorio se conserva como referencia histórica y técnica del desarrollo inicial de StockMind, incluyendo su arquitectura basada en servicios ejecutados de forma independiente, la migración inicial del frontend a React y la primera integración experimental del agente de inteligencia artificial.

El desarrollo actual de StockMind se encuentra en una implementación evolucionada basada en **Docker**, con una arquitectura orientada a facilitar la ejecución, configuración y despliegue del sistema.

### Proyecto actual

👉 **StockMind — versión actual:**  
[https://github.com/Shenao17/StockMind-Docker](https://github.com/Shenao17/StockMind)

> *La versión actual reemplaza progresivamente a esta implementación Legacy y constituye la línea principal de desarrollo del proyecto.*

---

## 🔄 Changelog

### v1.2.0 — Agente de IA Conversacional (Experimental)
> *Mayo 2026*

Se integra un asistente de inteligencia artificial conversacional como componente flotante en el frontend, accesible desde cualquier módulo del sistema. El agente opera en modo experimental y no tiene acceso directo a la base de datos en esta versión.

**Cambios realizados:**
- Nuevo componente `AgentBubble.jsx` — burbuja flotante tipo FAB posicionada en la esquina inferior derecha, visible en todos los módulos autenticados.
- Integración con **Groq API** usando el modelo `llama-3.3-70b-versatile` como motor de lenguaje.
- Contexto dinámico por módulo: el agente reconoce en qué sección del sistema se encuentra el usuario y adapta sus respuestas y sugerencias.
- Chips de preguntas rápidas específicos por módulo (Dashboard, Productos, Inventario, Ventas, Reportes, Predicciones, Usuarios).
- Indicador de estado en tiempo real: **en línea** (verde), **verificando** (amarillo), **sin conexión** (rojo).
- Banner de servicio no disponible con botón de reintento automático.
- Mensajes de error amigables diferenciados por tipo de fallo (cuota agotada, API key inválida, error de red).
- Historial de conversación con contexto de los últimos 10 mensajes por sesión.

**Estado experimental — limitaciones conocidas:**
- El agente no tiene acceso directo al backend ni a la base de datos; responde con conocimiento general del sistema.
- La API key de Groq debe configurarse manualmente en el componente o como variable de entorno Vite.
- El historial de conversación no persiste entre sesiones.

**Lo que NO cambió:**
- Arquitectura del sistema — ningún servicio existente fue modificado.
- Gateway Node.js, backend Java, microservicio Python y base de datos intactos.
- Lógica de autenticación, rutas protegidas y todos los módulos funcionales.

### v1.1.0 — Migración del Frontend a React
> *Abril 2026*

El frontend del sistema fue completamente migrado de HTML/CSS/JavaScript vanilla a **React 18 con Vite**, manteniendo el diseño visual, la lógica de negocio y la integración con el gateway Node.js sin modificaciones.

**Cambios realizados:**
- Reemplazo de las 8 páginas HTML independientes por una **Single Page Application (SPA)** con React Router.
- Implementación de `AuthContext` para manejo global de sesión JWT.
- Componente `Sidebar` con `NavLink` de React Router.
- Modal reutilizable y sistema de toasts como hooks y componentes React.
- Protección de rutas mediante verificación del token JWT en el contexto.
- Cliente HTTP centralizado (`api.js`) migrado como módulo ES con exports explícitos.
- Stack: **Vite + React 18 + React Router DOM**.

**Lo que NO cambió:**
- Paleta de colores, tipografías (Syne, Outfit, DM Mono) y estilos visuales.
- Lógica de autenticación y manejo del JWT utilizada en esta versión.
- Todas las llamadas al gateway Node.js (puerto 3000).
- Funcionalidades: Dashboard, Productos, Inventario, Ventas, Reportes, Predicciones y Usuarios.

---

## 📑 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Planteamiento del Problema](#-planteamiento-del-problema)
3. [Justificación](#-justificación)
4. [Objetivos](#-objetivos)
5. [Alcance](#-alcance)
6. [Requisitos del Sistema](#-requisitos-del-sistema)
7. [Arquitectura del Sistema](#-arquitectura-del-sistema)
8. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
9. [Estructura de Carpetas](#-estructura-de-carpetas)
10. [Diseño de Base de Datos](#-diseño-de-base-de-datos)
11. [Endpoints del Sistema](#-endpoints-del-sistema)
12. [Flujo de Integración](#-flujo-de-integración)
13. [Guía de Instalación y Ejecución](#-guía-de-instalación-y-ejecución)
14. [Relación con la versión actual](#-relación-con-la-versión-actual)

---

## 📖 Descripción General

**StockMind Legacy** es una plataforma web empresarial de gestión de inventario y ventas que incorpora analítica predictiva como componente diferenciador.

Permite a pequeñas y medianas empresas controlar su cadena de suministro en tiempo real, registrar ventas, gestionar usuarios y tomar decisiones de reabastecimiento basadas en modelos estadísticos de predicción de demanda.

Esta versión está construida sobre una arquitectura distribuida por capas:

| Capa | Tecnología | Puerto |
|------|-----------|--------|
| **Frontend** | React 18 + Vite + React Router | `5173` |
| **API Gateway** | Node.js + Express | `3000` |
| **Backend Principal** | Java Spring Boot | `8080` |
| **Microservicio Analítico** | Python Flask | `8000` |
| **Base de Datos** | MySQL | `3306` |

---

## 🛑 Planteamiento del Problema

Las pequeñas y medianas empresas del sector comercial enfrentan pérdidas recurrentes derivadas de una gestión deficiente del inventario: sobrestock que inmoviliza capital, desabastecimiento que afecta las ventas, y ausencia de herramientas que conviertan el historial de ventas en inteligencia operativa.

**Consecuencias identificadas:**
- Decisiones de compra basadas en intuición y no en datos históricos.
- Pérdidas por productos vencidos o sin rotación.
- Quiebres de stock en productos de alta demanda.
- Ausencia de alertas tempranas de desabastecimiento.
- Imposibilidad de anticipar picos de demanda estacionales.

**Pregunta de investigación:**
> *¿Cómo puede un sistema de información integrado con capacidad predictiva mejorar la toma de decisiones de reabastecimiento en pequeñas y medianas empresas?*

---

## 💡 Justificación

- **Dimensión académica:** El proyecto integra un stack tecnológico heterogéneo en una arquitectura de microservicios real, demostrando competencias en diseño de sistemas distribuidos, comunicación entre servicios REST y separación de responsabilidades.
- **Dimensión técnica:** Cada tecnología cumple un rol específico y no intercambiable. Java Spring Boot provee robustez transaccional. Node.js actúa como gateway sin acoplamiento directo. Python aporta capacidad estadística madura mediante herramientas como scikit-learn, statsmodels y pandas. React permite una experiencia de usuario fluida mediante SPA con estado global de sesión.
- **Dimensión empresarial:** StockMind busca democratizar capacidades de análisis y predicción para pequeñas y medianas empresas que no necesariamente cuentan con acceso a soluciones ERP de alto costo.

---

## 🎯 Objetivos

### Objetivo General
Desarrollar una plataforma web full stack para la gestión integral de inventario y ventas, incorporando un microservicio de analítica predictiva en Python que permita estimar la demanda futura por producto y generar recomendaciones de reabastecimiento basadas en historial de ventas.

### Objetivos Específicos
1. Diseñar e implementar una arquitectura distribuida por capas con separación clara de responsabilidades.
2. Desarrollar el backend principal en Java Spring Boot con módulos de autenticación, gestión de productos, control de inventario y registro de ventas.
3. Implementar un gateway API en Node.js con Express que unifique las rutas y gestione la comunicación entre frontend y servicios backend.
4. Construir un microservicio en Python Flask que consuma historial de ventas desde MySQL y genere predicciones de demanda.
5. Diseñar una base de datos MySQL normalizada que soporte transacciones de inventario, ventas y almacenamiento de predicciones.
6. Desarrollar un frontend en React 18 con Vite que consuma exclusivamente las rutas del gateway Node.js.
7. Documentar el sistema con nivel de detalle suficiente para su reproducción técnica y presentación académica.

---

## 📏 Alcance

### ✅ Incluido
- Autenticación JWT con roles (Admin, Vendedor).
- CRUD completo de productos con categorías.
- Control de stock con movimientos de entrada/salida y alertas de stock mínimo.
- Registro de ventas con detalle por producto y actualización automática de inventario.
- Dashboard con métricas clave.
- Predicción de demanda semanal/mensual por producto.
- Recomendaciones automáticas de cantidad a reabastecer.
- Reportes de ventas por período.
- Asistente de IA conversacional integrado (experimental, v1.2.0).

### ❌ Excluido
- Integración con pasarelas de pago reales.
- Módulo de proveedores y órdenes de compra automatizadas.
- Aplicación móvil nativa.
- Modelos de machine learning avanzados (LSTM, Prophet).
- Multi-tenancy.
- Acceso del agente IA a datos en tiempo real del backend.

---

## 📋 Requisitos del Sistema

### Requisitos Funcionales

| ID | Módulo | Descripción |
|----|--------|-------------|
| **RF-01** | Autenticación | Login con usuario/contraseña, retorna JWT |
| **RF-02** | Usuarios | CRUD de usuarios con gestión de roles |
| **RF-03** | Productos | CRUD completo con SKU, categoría, precio, stock mínimo |
| **RF-04** | Inventario | Registro de entradas/salidas con motivo y fecha |
| **RF-05** | Ventas | Registro con múltiples productos y cálculo automático |
| **RF-06** | Stock auto | Descuento automático de inventario al registrar venta |
| **RF-07** | Alertas | Notificaciones de productos con stock bajo el mínimo |
| **RF-08** | Reportes | Ventas por rango de fechas y por producto |
| **RF-09** | Predicción | Demanda semanal y mensual por producto |
| **RF-10** | Recomendación | Cantidad sugerida a reabastecer por producto |
| **RF-11** | Agente IA | Asistente conversacional accesible desde cualquier módulo |

### Requisitos No Funcionales

| ID | Categoría | Descripción |
|----|-----------|-------------|
| **RNF-01** | Seguridad | JWT requerido en todos los endpoints excepto login |
| **RNF-02** | Seguridad | Contraseñas almacenadas con BCrypt |
| **RNF-03** | Rendimiento | Respuesta del gateway < 500ms para CRUD estándar |
| **RNF-04** | Disponibilidad | Microservicio Python funciona independientemente |
| **RNF-05** | Mantenibilidad | Código organizado por módulos con responsabilidad única |
| **RNF-06** | Escalabilidad | Arquitectura permite agregar microservicios sin refactorizar |
| **RNF-07** | Portabilidad | Cada servicio ejecutable de forma independiente |
| **RNF-08** | Documentación | Todos los endpoints documentados |

---

## 🏗️ Arquitectura del Sistema

```text
┌──────────────────────────────────────────────────────────┐
│                    CLIENTE (Browser)                     │
│             React 18 + Vite + React Router DOM           │
│             Context API para sesión JWT                  │
│             AgentBubble (Groq / Llama 3.3) [experimental]│
└─────────────────────┬────────────────────────────────────┘
                      │ HTTP/REST
                      ▼
┌──────────────────────────────────────────────────────────┐
│             API GATEWAY — Node.js + Express              │
│  · Verificación JWT centralizada                         │
│  · Proxy/enrutamiento a Java API o Python API             │
│  · CORS, logging, manejo de errores                      │
│  Puerto: 3000                                            │
└──────────────┬───────────────────────────┬───────────────┘
               │ HTTP/REST                 │ HTTP/REST
               ▼                           ▼
┌──────────────────────────┐  ┌────────────────────────────┐
│ BACKEND Java Spring Boot │  │ MICROSERVICIO Python Flask │
│ · Lógica de negocio      │  │ · Análisis de historial    │
│ · Gestión de usuarios    │  │ · Predicción de demanda    │
│ · CRUD de productos      │  │ · Recomendaciones stock    │
│ · Ventas e inventario    │  │ Puerto: 8000               │
│ Puerto: 8080             │  └────────────┬───────────────┘
└──────────────┬───────────┘               │
               │ JDBC/JPA                 │ SQLAlchemy/mysql-connector
               └───────────────┬─────────┘
                               ▼
                    ┌───────────────────────────────┐
                    │          MySQL 8.x            │
                    │         stockmind_db          │
                    │          Puerto: 3306         │
                    └───────────────────────────────┘
```

**Principio de diseño:**
El frontend nunca consume directamente el backend Java ni el microservicio Python. Todo el tráfico pasa por el gateway Node.js, que actúa como único punto de entrada, aplicando autenticación centralizada y enrutamiento transparente. 

*Nota: El agente de IA (AgentBubble) es el único componente que realiza llamadas externas directamente desde el navegador, exclusivamente hacia la API de Groq.*

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Rol | Justificación |
|------------|---------|-----|---------------|
| **React** | 18 | Frontend SPA | Componentes reutilizables, estado global, navegación SPA |
| **Vite** | 8.x | Bundler / Dev server | HMR ultrarrápido, build optimizado |
| **React Router** | 6.x | Enrutamiento SPA | Navegación declarativa con protección de rutas |
| **Node.js** | 20 LTS | API Gateway | I/O no bloqueante ideal para proxy de peticiones |
| **Express** | 4.x | Framework HTTP | Minimalista, robusto, ecosistema maduro |
| **Java** | 17 LTS | Backend | Tipado fuerte, robustez |
| **Spring Boot** | 3.x | Framework Java | Auto-configuración, Spring Security, JPA |
| **Python** | 3.11+ | Microservicio | Ecosistema estadístico |
| **Flask** | 3.x | Framework Python | Ligero, ideal para microservicio REST |
| **MySQL** | 8.x | Base de datos | ACID compliance, integridad referencial |
| **pandas** | 2.x | Analítica | Manipulación de series temporales |
| **scikit-learn** | 1.x | ML | Modelos de regresión y predicción |
| **JWT** | — | Autenticación | Stateless, compatible con arquitectura distribuida |
| **Groq API** | — | Motor IA | Inferencia ultrarrápida (experimental) |
| **Llama 3.3 70B** | — | Modelo de lenguaje | Capacidad conversacional avanzada |

---

## 📁 Estructura de Carpetas

```text
stockmind/
│
├── README.md
├── start.bat
│
├── docs/
│   ├── architecture.md
│   ├── api-endpoints.md
│   ├── database-design.md
│   ├── manual-tecnico.md
│   └── manual-usuario.md
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── index.css
│       ├── context/
│       ├── hooks/
│       ├── components/
│       └── pages/
│
├── gateway/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   └── src/
│       ├── config/
│       ├── middleware/
│       └── routes/
│
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/stockmind/
│       └── resources/
│
├── analytics/
│   ├── requirements.txt
│   ├── app.py
│   ├── config.py
│   └── src/
│       ├── routes/
│       ├── services/
│       └── models/
│
└── database/
    ├── schema.sql
    └── seed.sql
```

---

## 🗄️ Diseño de Base de Datos

### Diagrama Entidad-Relación

```text
USERS ──────────────────── SALES
 id (PK)                     id (PK)
 username                    user_id (FK → USERS)
 email                       total
 password_hash               status
 role                        created_at
 active
 created_at             SALE_DETAILS
                             id (PK)
CATEGORIES                  sale_id (FK → SALES)
 id (PK)                     product_id (FK → PRODUCTS)
 name                        quantity
 description                 unit_price
                             subtotal
PRODUCTS
 id (PK)                INVENTORY_MOVEMENTS
 category_id (FK)          id (PK)
 name                      product_id (FK → PRODUCTS)
 sku                       user_id (FK → USERS)
 description               type (ENTRY/EXIT/SALE/ADJUST)
 price                     quantity
 stock_current             reason
 stock_minimum             stock_before
 unit                      stock_after
 active                    created_at
 created_at

                       DEMAND_PREDICTIONS
                            id (PK)
                            product_id (FK → PRODUCTS)
                            period_type (WEEKLY/MONTHLY)
                            period_label
                            predicted_quantity
                            confidence
                            generated_at
```

---

## 🔌 Endpoints del Sistema

### Gateway — Puerto `3000`

```text
Autenticación
POST   /api/auth/login           → Iniciar sesión
GET    /api/auth/me              → Perfil actual

Usuarios — requiere rol Admin
GET    /api/users                → Listar usuarios
POST   /api/users                → Crear usuario
PUT    /api/users/:id            → Editar usuario
DELETE /api/users/:id            → Eliminar usuario

Productos
GET    /api/products             → Listar productos
GET    /api/products/:id         → Detalle de producto
POST   /api/products             → Crear producto [Admin]
PUT    /api/products/:id         → Editar producto [Admin]
DELETE /api/products/:id         → Eliminar producto [Admin]
GET    /api/products/low-stock   → Productos con stock crítico

Inventario
GET    /api/inventory/movements  → Historial de movimientos
POST   /api/inventory/movements  → Registrar movimiento [Admin]

Ventas
GET    /api/sales                → Listar ventas
POST   /api/sales                → Registrar venta
GET    /api/sales/:id            → Detalle de venta

Reportes — requiere rol Admin
GET    /api/reports/sales        → Ventas por período
GET    /api/reports/top-products → Productos más vendidos

Predicciones
GET    /api/predictions/:productId        → Predicción por producto
GET    /api/predictions/recommendations   → Recomendaciones generales
```

---

## 🛤️ Flujo de Integración

### Flujo 1: Login
`Frontend` ➜ `POST /api/auth/login` ➜ `Gateway` ➜ `POST /auth/login (Java)` ➜ *Java valida credenciales y genera JWT* ➜ `Gateway` ➜ `Frontend`

### Flujo 2: Registro de venta
`Frontend` ➜ `POST /api/sales {items}` ➜ `Gateway` ➜ `POST /sales (Java)` ➜ *Java valida stock, persiste Sale/SaleDetails, descuenta stock y registra InventoryMovement* ➜ `Gateway` ➜ `Frontend`

### Flujo 3: Predicción de demanda
`Frontend` ➜ `GET /api/predictions/42` ➜ `Gateway` ➜ `GET /predict/42 (Python)` ➜ *Python consulta MySQL, aplica modelo estadístico, persiste predicción y retorna JSON* ➜ `Gateway` ➜ `Frontend`

### Flujo 4: Agente IA — Experimental
`Usuario` ➜ `AgentBubble` ➜ `Groq API` ➜ `Llama 3.3 70B` ➜ *Respuesta en lenguaje natural* ➜ `AgentBubble`

*(El agente opera de forma independiente al gateway y no requiere autenticación JWT para funcionar).*

---

## 🚀 Guía de Instalación y Ejecución

### Prerrequisitos
- Node.js 20 LTS
- Java 17 JDK
- Python 3.11+
- MySQL 8.x
- Maven 3.x
- API Key de Groq (opcional, para utilizar el agente IA)

### Inicio rápido — Windows
Ejecutar `start.bat` en la raíz del proyecto. El script levanta los servicios y abre el navegador automáticamente en `http://localhost:5173`.

### Inicio Manual

*Requiere MySQL Community Server 8.x activo y la base de datos inicializada previamente.*

**1. Base de datos**
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p stockmind_db < database/seed.sql
```

**2. Backend Java (`http://localhost:8080`)**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**3. Microservicio Python (`http://localhost:8000`)**
```bash
cd analytics
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**4. Gateway Node.js (`http://localhost:3000`)**
```bash
cd gateway
npm install
npm start
```

**5. Frontend React (`http://localhost:5173`)**
```bash
cd frontend
npm install
npm run dev
```

### Variables de entorno

**`gateway/.env`**
```env
PORT=3000
JAVA_API_URL=http://localhost:8080
PYTHON_API_URL=http://localhost:8000
JWT_SECRET=stockmind_super_secret_key_2024
```
> *Para entornos reales se recomienda utilizar un secreto JWT propio.*

**Configuración del Agente IA (Frontend)**
El agente IA requiere una API Key de Groq. Se debe configurar como variable de entorno de Vite:

**`frontend/.env`**
```env
VITE_GROQ_API_KEY=tu_api_key_aqui
```
> *Si no se configura la API key, el agente mostrará el estado correspondiente y no afectará el funcionamiento del resto del sistema.*

---

## 🔗 Relación con la versión actual

StockMind Legacy y StockMind forman parte de la evolución del mismo proyecto. Esta implementación corresponde a la arquitectura original desarrollada antes de la adopción del entorno Docker como base principal de ejecución.

La versión actual busca conservar la funcionalidad principal de StockMind mientras mejora aspectos relacionados con:
- Portabilidad y reproducibilidad del entorno.
- Aislamiento de servicios y comunicación entre contenedores.
- Facilidad de configuración y despliegue.

Por esta razón, este repositorio se conserva como **Legacy** y no representa la línea principal actual de desarrollo.

👉 **Repositorio actual:** [https://github.com/Shenao17/StockMind-Docker](https://github.com/Shenao17/StockMind)

---

## 📜 Licencia / Uso

Proyecto desarrollado con fines académicos y de aprendizaje, como parte del proceso de formación y desarrollo de software.

## 👨‍💻 Autoría

**StockMind Legacy v1.2.0**  
Desarrollado por **BlackLabs**  
Dev: **Sebas**

*Un proyecto que empezó como una implementación académica y continúa evolucionando hacia una arquitectura más reproducible, mantenible y orientada a despliegues reales.*

**BlackLabs · StockMind · Legacy v1.2.0**
