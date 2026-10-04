const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'PhonePe Backend API',
        description: 'PhonePe Backend System API Documentation'
    },
    host: 'phonepe-backend-system-1.onrender.com',
    schemes: ['https']
};


const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);