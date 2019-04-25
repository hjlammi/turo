'use strict';

module.exports.createUser = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello Serverless testingtestingtestgtrshtrgfv!',
      input: event,
    }),
  };
};
