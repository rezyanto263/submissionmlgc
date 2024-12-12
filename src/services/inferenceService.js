const tfjs = require('@tensorflow/tfjs-node');
const ClientError = require('../exceptions/ClientError');

const predictClassification = async (model, image) => {
  try {
    const tensor = tfjs.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Cancer', 'Non-cancer'];
    const predictedClass = classes[confidenceScore > 0.5 ? 0 : 1];

    let suggestion;
    if (predictedClass === 'Cancer') {
      suggestion = 'Segera periksa ke dokter!';
    } else {
      suggestion = 'Penyakit kanker tidak terdeteksi.';
    }

    return { predictedClass, suggestion };
  } catch (err) {
    console.log(err);
    throw new ClientError('Terjadi kesalahan dalam melakukan prediksi', 400);
  }
}

module.exports = predictClassification;