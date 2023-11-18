/*"use strict"

// const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

const rabbitPromise = require('./rabbitMQ');
exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    const id = parseInt(event.path.split("/").reverse()[0]);
    
    const channel = await rabbitPromise();
    const request = `{"method":"UPDATE","id":${id},"body":${event.body}}`;
    await channel.sendToQueue("ciudades", Buffer.from(request));

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};*/
"use strict"
const redis = require('./redisDB');
const headers = require('./headersCORS');
exports.handler = async (event, context) => {
  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
  try {
    const id = event.path.split("/").reverse()[0];
    redis.on("connect", function() {
      console.log("You are now connected");
    });
   const result = await redis.set('ciudades_'+id,event.body);
   console.log({result})//si es exitoso muestra 'OK'
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
