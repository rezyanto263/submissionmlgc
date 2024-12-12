require('dotenv').config();
const Hapi = require('@hapi/hapi');
const loadModel = require('../services/loadModel');
const routes = require('./routes');
const ClientError = require('../exceptions/ClientError');

(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
       cors: {
        origin: ['*']
       }
    }
  });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);

  server.ext('onPreResponse', (request, h) => {
    const response = request.response;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
})();