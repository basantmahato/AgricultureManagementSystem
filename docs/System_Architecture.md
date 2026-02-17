# System Architecture - agroFarm Platform

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WebApp[React Frontend<br/>Port: 5173]
        Mobile[Future Mobile App]
    end
    
    subgraph "API Gateway / Backend"
        Express[Express.js Server<br/>Port: 5000]
        Routes[API Routes]
        Middleware[Auth & Validation Middleware]
    end
    
    subgraph "Business Logic Layer"
        AuthCtrl[Authentication Controller]
        UserCtrl[User Controller]
        TaskCtrl[Task Controller]
        SoilCtrl[Soil Controller]
        OrderCtrl[Order Controller]
        AdminCtrl[Admin Controller]
    end
    
    subgraph "Data Layer"
        MongoDB[(MongoDB Database)]
        FileStorage[File Storage<br/>uploads/]
    end
    
    subgraph "External Services"
        WeatherAPI[OpenWeatherMap API]
        NewsAPI[NewsData.io API]
    end
    
    WebApp -->|HTTP/HTTPS| Express
    Mobile -->|HTTP/HTTPS| Express
    
    Express --> Routes
    Routes --> Middleware
    Middleware --> AuthCtrl
    Middleware --> UserCtrl
    Middleware --> TaskCtrl
    Middleware --> SoilCtrl
    Middleware --> OrderCtrl
    Middleware --> AdminCtrl
    
    AuthCtrl --> MongoDB
    UserCtrl --> MongoDB
    TaskCtrl --> MongoDB
    SoilCtrl --> MongoDB
    OrderCtrl --> MongoDB
    AdminCtrl --> MongoDB
    
    SoilCtrl --> FileStorage
    OrderCtrl --> MongoDB
    
    TaskCtrl --> WeatherAPI
    WebApp --> NewsAPI
```

## Detailed Component Architecture

```mermaid
graph LR
    subgraph "Frontend - React Application"
        A[React Router] --> B[Pages]
        B --> C[Components]
        C --> D[Context API]
        D --> E[API Service]
    end
    
    subgraph "Backend - Node.js/Express"
        F[Express App] --> G[Routes]
        G --> H[Middleware]
        H --> I[Controllers]
        I --> J[Models]
        J --> K[MongoDB]
    end
    
    E -->|REST API| F
    I --> L[File Upload<br/>Multer]
    L --> M[File System]
```

## Technology Stack

### Frontend
- **Framework**: React 19.2.0
- **Routing**: React Router DOM 6.30.3
- **State Management**: React Context API
- **Styling**: Plain CSS (inline styles)
- **Animations**: AOS (Animate On Scroll) 2.3.4
- **HTTP Client**: Axios 1.13.5
- **Build Tool**: Vite 7.3.1

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB (Mongoose 8.0.3)
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **File Upload**: Multer 2.0.2
- **CORS**: cors 2.8.5

### External APIs
- **Weather**: OpenWeatherMap API
- **News**: NewsData.io API

## System Layers

### 1. Presentation Layer (Frontend)
```
┌─────────────────────────────────────┐
│  React Components                    │
│  - Pages (Home, Dashboard, etc.)    │
│  - Components (Navbar, Cards, etc.)  │
│  - Context (Auth, Cart)             │
└─────────────────────────────────────┘
```

### 2. Application Layer (Backend)
```
┌─────────────────────────────────────┐
│  Express Routes & Controllers        │
│  - /auth (login, register)         │
│  - /user (dashboard)                │
│  - /tasks (CRUD operations)         │
│  - /soil (soil bookings)            │
│  - /equipment (catalog)             │
│  - /orders (order management)       │
│  - /admin (admin operations)        │
└─────────────────────────────────────┘
```

### 3. Data Access Layer
```
┌─────────────────────────────────────┐
│  Mongoose Models                     │
│  - User Model                        │
│  - Task Model                       │
│  - SoilBooking Model                │
│  - Equipment Model                  │
│  - Order Model                      │
└─────────────────────────────────────┘
```

### 4. Data Storage Layer
```
┌─────────────────────────────────────┐
│  MongoDB Collections                 │
│  - users                            │
│  - tasks                            │
│  - soilbookings                     │
│  - equipment                        │
│  - orders                           │
└─────────────────────────────────────┘
```

## API Architecture

### RESTful API Structure
```
Base URL: http://localhost:5000/ (or deployed URL)

├── /auth
│   ├── POST /register    - User registration
│   └── POST /login       - User login
│
├── /user
│   └── GET /dashboard    - Get user dashboard data
│
├── /tasks
│   ├── GET /             - Get user's tasks
│   ├── POST /            - Create task
│   ├── GET /:id          - Get task by ID
│   ├── PUT /:id          - Update task
│   └── DELETE /:id      - Delete task
│
├── /soil
│   ├── POST /            - Create soil booking
│   └── GET /             - Get user's soil bookings
│
├── /equipment
│   └── GET /             - Get all equipment
│
├── /orders
│   ├── POST /            - Create order (COD)
│   └── GET /my           - Get user's orders
│
└── /admin
    ├── GET /stats        - Get admin statistics
    ├── GET /users        - Get all users
    ├── GET /tasks        - Get all tasks
    ├── GET /soil         - Get all soil bookings
    ├── PUT /soil/:id/status - Update soil booking status
    ├── GET /orders       - Get all orders
    └── PUT /orders/:id/status - Update order status
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    
    U->>F: Login Request
    F->>B: POST /auth/login
    B->>DB: Verify Credentials
    DB-->>B: User Data
    B->>B: Generate JWT Token
    B-->>F: Token + User Data
    F->>F: Store Token & User
    F-->>U: Redirect to Dashboard/Admin
```

## Request Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant M as Middleware
    participant Ctrl as Controller
    participant DB as Database
    
    C->>M: HTTP Request + Token
    M->>M: Validate Token
    M->>M: Check Permissions
    M->>Ctrl: Authorized Request
    Ctrl->>DB: Query/Update
    DB-->>Ctrl: Data
    Ctrl-->>C: JSON Response
```

## Security Architecture

```
┌─────────────────────────────────────┐
│  Security Layers                    │
├─────────────────────────────────────┤
│  1. CORS Configuration              │
│  2. JWT Token Authentication        │
│  3. Password Hashing (bcrypt)       │
│  4. Input Validation                │
│  5. Role-Based Access Control       │
│  6. File Upload Validation          │
└─────────────────────────────────────┘
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        A[Frontend<br/>Vite Build] --> B[Static Hosting<br/>Vercel/Netlify]
        C[Backend<br/>Node.js] --> D[Cloud Hosting<br/>Render/Railway]
        D --> E[MongoDB Atlas]
        D --> F[File Storage<br/>Cloud Storage]
    end
    
    B -->|API Calls| D
    C --> E
    C --> F
```

## Data Flow Architecture

```
User Input → Frontend Validation → API Request → 
Backend Middleware → Controller → Database → 
Response → Frontend Update → User Feedback
```

## File Upload Architecture

```
Client → Multer Middleware → File Validation → 
Save to uploads/ → Store Path in Database → 
Serve via Static Route /uploads
```

## Scalability Considerations

- **Horizontal Scaling**: Stateless API allows multiple instances
- **Database**: MongoDB supports sharding and replication
- **Caching**: Can add Redis for session/token caching
- **CDN**: Static assets can be served via CDN
- **Load Balancing**: Multiple backend instances behind load balancer
