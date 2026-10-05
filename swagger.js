const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'PhonePe Backend API',
        description: 'PhonePe Backend System API Documentation'
    },
    host: 'phonepe-backend-system-4.onrender.com',
    schemes: ['https'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Format: Bearer <token>'
        }
    }
};


const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);