module.exports.createUser = async event => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Hello Serverless testingtestingtestgtrshtrgfv!',
    input: event,
  }),
});

module.exports.authenticate = async () => ({
});
