'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello Serverless testingtesting!',
      input: event,
    }),
  };
};
