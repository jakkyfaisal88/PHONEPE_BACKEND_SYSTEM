
# PhonePe Backend System

A backend API project inspired by digital payment platforms such as PhonePe.

The project provides backend functionality for user authentication, wallet management, bill payments, money transfers, and transaction handling using Node.js, Express.js, MongoDB, and Mongoose.

The application follows a modular backend architecture with separate routes, controllers, middleware, models, and database configuration.

## 📌 Project Highlights

This project demonstrates practical experience with:

- REST API development
- Node.js and Express.js
- MongoDB and Mongoose
- JWT authentication
- Password hashing
- Authentication middleware
- Layered backend architecture
- API documentation with Swagger/OpenAPI
- API testing with Postman
- Environment-based configuration
- Backend security practices


## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Authenticate user | ❌ |
| GET | `/api/auth/profile` | Retrieve authenticated user's profile | ✅ |

### Wallet

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/wallet/add-money` | Add money to wallet | ✅ |
| POST | `/api/wallet/pay-bill` | Process a bill payment | ✅ |

### Transactions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/transactions/send` | Transfer money to another user | ✅ |
| GET | `/api/transactions/history` | Retrieve transaction records | ✅ |


Interactive API docs (Swagger UI): https://phonepe-backend-system-1.onrender.com/api-docs



## 🔑 Authentication

The authentication flow consists of registration, login, JWT generation, and protected routes.

### Registration

```
POST /api/auth/register
        ↓
Validate user data
        ↓
Check existing email/phone
        ↓
Hash password
        ↓
Create user
        ↓
Save to MongoDB
        ↓
Generate JWT
```

### Login

```
POST /api/auth/login
        ↓
Find user
        ↓
Compare password
        ↓
Generate JWT
        ↓
Return authentication token
```

### Protected Routes

Protected requests use:

```
Authorization: Bearer <JWT>
```

The `protect` middleware verifies the token and attaches the authenticated user's information to the request before the protected controller is executed.


## 🔒 Security

The project includes the following security measures:

- Password hashing with `bcryptjs`
- JWT-based authentication
- MPIN-based transaction authorization
- Protected routes using authentication middleware
- Environment variables for sensitive configuration
- `.env` excluded from Git
- JWT verification before accessing protected resources



## 📁 Project Structure
```
PHONEPE_BACKEND_SYSTEM/
│
├── server.js
├── swagger.js
├── swagger-output.json
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
│
└── src/
    │
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── walletController.js
    │   └── transactionController.js
    │
    ├── middleware/
    │   └── protect.js
    │
    ├── models/
    │   ├── User.js
    │   └── Transaction.js
    │
    └── routes/
        ├── authRoutes.js
        ├── walletRoutes.js
        └── transactionRoute.js
```

## Architecture

The project separates responsibilities across different layers:

- **Routes** — API endpoint definitions
- **Controllers** — Application and business logic
- **Middleware** — Authentication and request processing
- **Models** — MongoDB schemas and data operations
- **Config** — Database configuration
- **server.js** — Application entry point
- **swagger.js** — Swagger/OpenAPI documentation setup
- - **.env** — Environment variables (not committed to Git)


## 🏗️ Request Architecture

```
Client
  │
  ▼
Express Server
  │
  ▼
Routes
  │
  ▼
Authentication Middleware
  │
  ▼
Controllers
  │
  ▼
Mongoose Models
  │
  ▼
MongoDB
  │
  ▼
Response
```

### Example: Wallet Request

```
POST /api/wallet/add-money
          ↓
walletRoutes.js
          ↓
protect.js
          ↓
walletController.js
          ↓
User.js
          ↓
MongoDB
          ↓
JSON Response
```


## 🗄️ Database

The application uses MongoDB with Mongoose for data modeling and database operations.

### User Model

```
User
├── name
├── email
├── phone
├── password
├── MPIN
├── UPI ID
└── balance
```

### Transaction Model

```
Transaction
├── sender
├── receiver
├── amount
├── type
├── status
└── timestamp
```

User and transaction data are persisted in MongoDB.


## 🧪 API Testing

The APIs are tested using Postman during development.

### Example: Register

```
POST /api/auth/register
```

```json
{
  "name": "Jakky",
  "email": "jakky@example.com",
  "phone": "9876543210",
  "password": "pass123"
}
```

### Example: Login

```
POST /api/auth/login
```

```json
{
  "email": "jakky@example.com",
  "password": "pass123"
}
```

The login response provides the JWT used for authenticated API requests.



## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/jakkyfaisal88/PHONEPE_BACKEND_SYSTEM.git
```

### Navigate to the project

```bash
cd PHONEPE_BACKEND_SYSTEM
```

### Install dependencies

```bash
npm install
```

### Run the server

Development mode:

```bash
npm run dev
```

Normal mode:

```bash
node server.js
```

The server runs on `http://localhost:3000`



## 🔐 Environment Configuration

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used for JWT signing and verification |

> The `.env` file is excluded from Git using `.gitignore` to prevent sensitive configuration values from being committed to the repository.




## 👨‍💻 Author

**Jakky Faisal**

Backend project developed to practice designing and implementing RESTful APIs using Node.js, Express.js, and MongoDB.

- GitHub: [@jakkyfaisal88](https://github.com/jakkyfaisal88)
- LinkedIn: Jakky Faisal : Coming Soon
