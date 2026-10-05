require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const swaggerUi = require('swagger-ui-express');


let swaggerDocument = {};

try {
    swaggerDocument = require('./swagger-output.json');
} catch (err) {
    console.error('Error loading Swagger document:', err);
}



const app = express();
app.use(cors({
    origin: "https://phonepe-backend-system-4.onrender.com"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();
const port = process.env.PORT || 3000;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)
);   


app.get('/', (req, res) => {
    res.send('PhonePe Backend System is Running');
}); 


app.use('/api/auth', authRoutes);
app.use("/api/transactions", require('./src/routes/transactionRoute'))
app.use('/api/wallet', require('./src/routes/walletRoutes'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

