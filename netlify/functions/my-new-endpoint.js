// netlify/functions/my-new-endpoint.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from my new endpoint!" }),
  };
};
