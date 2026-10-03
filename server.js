require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const swaggerUi = require('swagger-ui-express');

// Swagger document -jo ki swagger ki sari document rakhti hai  
let swaggerDocument = {};

try {
    swaggerDocument = require('./swagger-output.json');
} catch (err) {
    console.error('Error loading Swagger document:', err);
}


// sabse pahkle yehi middleware chalenge //ab jo v request ayegi usse hmara app samajh payega
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));


connectDB();
const port = process.env.PORT || 3000;


app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument)
);  //jo v swagger pe mai data dalunga usse ye setup krke endpoint pe ye serve kr dega  


app.get('/', (req, res) => {
    res.send('PhonePe Backend System is Running');
});  //this is test Is it running


app.use('/api/auth', authRoutes);
app.use("/api/transactions", require('./src/routes/transactionRoute'))
app.use('/api/wallet', require('./src/routes/walletRoutes'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

