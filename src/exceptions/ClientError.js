class ClientError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'Client Error'
  }
}

module.exports = ClientError;