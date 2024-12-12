const predictClassification = require("../services/inferenceService");
const crypto = require('crypto');
const storeData = require("../services/storeData");
const getAllData = require("../services/getAllData");

const postPredictClassification = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { predictedClass, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: predictedClass,
    suggestion: suggestion,
    createdAt: createdAt
  }

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data: data
  });
  response.code(201);

  return response;
}

const getPredictionHistories = async (request, h) => {
  const data = await getAllData();

  console.log(data);

  const response = h.response({
    status: 'success',
    data: data
  });

  return response;
}

module.exports = { getPredictionHistories, postPredictClassification };