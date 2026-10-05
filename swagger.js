const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const fs = require('fs');

const doc = {
    info: {
        title: 'PhonePe Backend API',
        description: 'PhonePe Backend System API Documentation'
    },
    servers: [
        { url: 'https://phonepe-backend-system-4.onrender.com' }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const spec = JSON.parse(fs.readFileSync(outputFile, 'utf8'));

    for (const path of Object.values(spec.paths)) {
        for (const method of Object.values(path)) {
            if (method.parameters) {
                method.parameters = method.parameters.filter(
                    (p) => !(p.in === 'header' && p.name.toLowerCase() === 'authorization')
                );
                if (method.parameters.length === 0) delete method.parameters;
            }
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(spec, null, 2));
    console.log('Extra authorization params removed');
});