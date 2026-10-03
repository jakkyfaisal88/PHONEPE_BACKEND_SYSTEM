# 📱 PhonePe Backend System

A backend API project inspired by digital payment platforms such as PhonePe.

The project provides backend functionality for **user authentication, wallet management, bill payments, money transfers, and transaction handling** using Node.js, Express.js, MongoDB, and Mongoose.

The application follows a modular backend architecture with separate **routes, controllers, middleware, models, and database configuration**.

---

## 🚀 Features

- User registration and login
- JWT-based authentication
- Protected API routes
- User profile API
- Password hashing using bcryptjs
- MPIN-based transaction authorization
- Wallet management
- Add money to wallet
- Bill payment
- Money transfer
- Transaction management
- MongoDB database integration
- RESTful API architecture
- Swagger/OpenAPI API documentation
- Postman API testing
- Environment-based configuration

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **Node.js** | Backend runtime |
| **Express.js** | REST API development |
| **MongoDB** | Database |
| **Mongoose** | MongoDB data modeling |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment configuration |
| **CORS** | Cross-origin request handling |
| **Swagger/OpenAPI** | API documentation |
| **Postman** | API testing |

---

## 📁 Project Structure

PHONEPE_BACKEND_SYSTEM/
│
├── server.js
├── package.json
├── package-lock.json
├── .env
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
        └── transactionRoutes.js


Architecture

The project separates responsibilities across different layers:

Routes — API endpoint definitions
Controllers — Application and business logic
Middleware — Authentication and request processing
Models — MongoDB schemas and data operations
Config — Database configuration
server.js — Application entry point


---------------------------------------------------

⚙️ Getting Started
Clone the repository
git clone <your-github-repository-url>

Navigate to the project
cd PHONEPE_BACKEND_SYSTEM

Install dependencies
npm install


🔐 Environment Configuration

Create a .env file in the project root:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Variable	Description
PORT	Server port
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret used for JWT signing and verification

The .env file is excluded from Git using .gitignore to prevent sensitive configuration values from being committed to the repository.


-----------------------------------------------
▶️ Running the Application
Development
npm run dev


Normal execution
node server.js


The server runs on:
http://localhost:3000



🔑 Authentication

The authentication flow consists of registration, login, JWT generation, and protected routes.

Registration

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


Login

POST /api/auth/login
        ↓
Find user
        ↓
Compare password
        ↓
Generate JWT
        ↓
Return authentication token


Protected Routes

Protected requests use:

Authorization: Bearer <JWT>

The protect middleware verifies the token and attaches the authenticated user's information to the request before the protected controller is executed.




📡 API Endpoints
Authentication
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register a new user	❌
POST	/api/auth/login	Authenticate user	❌
GET	/api/auth/profile	Retrieve authenticated user's profile	✅
Wallet
Method	Endpoint	Description	Auth
POST	/api/wallet/add-money	Add money to wallet	✅
POST	/api/wallet/pay-bill	Process a bill payment	✅