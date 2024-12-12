const { postPredictClassification, getPredictionHistories } = require("./handler");

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictClassification,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000 
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getPredictionHistories,
  }
];

module.exports = routes;