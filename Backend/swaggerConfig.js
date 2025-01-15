const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', // Especificação da versão do OpenAPI
    info: {
      title: 'API de Gestão de PABX', // Título da sua API
      version: '1.0.0', // Versão da API
      description: 'Esta é uma API de gestão de PABX', // Descrição
    },
  },
  apis: ['./routes/**/*.js'], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
