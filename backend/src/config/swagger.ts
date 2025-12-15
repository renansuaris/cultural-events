import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cultural Events',
      version: '1.0.0',
      description: 'API do projeto Cultural Events - Web2',
      contact: {
        name: 'Renan',
        email: 'renanalencar@alu.ufc.br',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: [
    './src/routes.ts',
    './src/docs/*.swagger.ts',
  ],
}; 

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;