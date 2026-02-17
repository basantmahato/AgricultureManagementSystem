# Data Flow Diagram (DFD) - agroFarm System

## Level 0 - Context Diagram

```mermaid
graph TD
    User[User/Farmer] -->|Login/Register| System[agroFarm System]
    Admin[Admin] -->|Manage System| System
    System -->|User Data| User
    System -->|Admin Dashboard| Admin
    System -->|Weather Data| WeatherAPI[Weather API]
    System -->|News Data| NewsAPI[News API]
    System -->|Store Data| Database[(MongoDB Database)]
```

## Level 1 - System Overview

```mermaid
graph TD
    User[User] -->|Login Credentials| Auth[Authentication Process]
    User -->|Task Data| TaskMgmt[Task Management]
    User -->|Soil Booking| SoilMgmt[Soil Booking Process]
    User -->|Equipment Order| OrderMgmt[Order Management]
    
    Admin -->|Admin Login| Auth
    Admin -->|View All Data| AdminMgmt[Admin Management]
    
    Auth -->|User Data| UserDB[(User Database)]
    TaskMgmt -->|Task Data| TaskDB[(Task Database)]
    SoilMgmt -->|Soil Data| SoilDB[(Soil Booking Database)]
    OrderMgmt -->|Order Data| OrderDB[(Order Database)]
    OrderMgmt -->|Equipment Info| EquipmentDB[(Equipment Database)]
    
    AdminMgmt -->|Read All| UserDB
    AdminMgmt -->|Read All| TaskDB
    AdminMgmt -->|Read All| SoilDB
    AdminMgmt -->|Read All| OrderDB
    AdminMgmt -->|Update Status| SoilDB
    AdminMgmt -->|Update Status| OrderDB
    
    TaskMgmt -->|Weather Query| WeatherAPI[Weather API]
    SoilMgmt -->|Upload Photos| FileStorage[File Storage]
    OrderMgmt -->|Equipment Catalog| EquipmentDB
```

## Level 2 - Detailed Process Flows

### Authentication Flow
```mermaid
graph LR
    A[User Input] -->|Email/Password| B[Validate Input]
    B -->|Valid| C[Check Database]
    C -->|Found| D[Verify Password]
    D -->|Match| E[Generate Token]
    E -->|Return| F[User Dashboard]
    C -->|Not Found| G[Error Message]
    D -->|No Match| G
```

### Task Management Flow
```mermaid
graph TD
    A[User Creates Task] -->|Task Details| B[Validate Task Data]
    B -->|Valid| C[Save to Database]
    C -->|Success| D[Update User Dashboard]
    D -->|Fetch Weather| E[Weather API]
    E -->|Return Data| F[Display Dashboard]
    B -->|Invalid| G[Show Error]
```

### Order Management Flow
```mermaid
graph TD
    A[User Adds to Cart] -->|Cart Items| B[Cart Storage]
    B -->|Checkout| C[Collect Shipping Info]
    C -->|Validate| D[Create Order]
    D -->|Calculate Total| E[Save Order]
    E -->|Update Inventory| F[Equipment Database]
    F -->|Confirmation| G[Order Confirmed]
```

### Soil Booking Flow
```mermaid
graph TD
    A[User Fills Form] -->|Soil Data| B[Upload Photos]
    B -->|Files| C[File Storage]
    C -->|Save Booking| D[Soil Booking DB]
    D -->|Notify Admin| E[Admin Dashboard]
    E -->|Update Status| D
    D -->|Status Update| A
```

---

## Data Flow Descriptions

### External Entities
- **User/Farmer**: Regular users who use the platform
- **Admin**: System administrators
- **Weather API**: External weather service
- **News API**: External news service

### Data Stores
- **User Database**: Stores user accounts and profiles
- **Task Database**: Stores farm tasks
- **Soil Booking Database**: Stores soil test bookings
- **Order Database**: Stores equipment orders
- **Equipment Database**: Stores equipment catalog
- **File Storage**: Stores uploaded images

### Processes
1. **Authentication**: User login/registration
2. **Task Management**: Create, update, delete tasks
3. **Soil Booking**: Submit and manage soil test requests
4. **Order Management**: Cart and order processing
5. **Admin Management**: View and manage all system data

---

## Data Flows

| Flow ID | From | To | Data |
|---------|------|-----|------|
| D1 | User | Authentication | Login credentials |
| D2 | Authentication | User Database | User data |
| D3 | User | Task Management | Task details |
| D4 | Task Management | Task Database | Task records |
| D5 | User | Soil Booking | Soil form data |
| D6 | Soil Booking | File Storage | Image files |
| D7 | User | Order Management | Cart items |
| D8 | Order Management | Order Database | Order records |
| D9 | Admin | Admin Management | Admin queries |
| D10 | Admin Management | All Databases | Read/Update operations |
