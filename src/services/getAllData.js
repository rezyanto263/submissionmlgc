const { Firestore } = require('@google-cloud/firestore');

async function getAllData() {
  const db = new Firestore();

  const snapshot = await db.collection('predictions').get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      history: {
        result: data.result,
        createdAt: data.createdAt,
        suggestion: data.result == 'Non-cancer' ? 'Anda sehat!' : data.suggestion,
        id: doc.id
      }
    };
  });
}

module.exports = getAllData;