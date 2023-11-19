/*"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
	
  try {
    const client = await clientPromise;
    const id = parseInt(event.path.split("/").reverse()[0]);

    // const respuesta = await client.db("proyecto").collection("edificios").find({}).toArray();
    const respuesta = await client.db("proyecto").collection("edificios").find({ciudad_id:id}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(respuesta)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};*/

"use strict";

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

exports.handler = async (event, context) => {
  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    redis.on("connect", function() {
      console.log("You are now connected to Redis");
    });

    const id = parseInt(event.path.split("/").reverse()[0]);
    const keys = (await redis.keys(`edificios_${id}_*`)).filter(id => id !== `edificios_${id}_N`);
    const edificios = await redis.mget(keys);

    edificios.forEach(toJson);
    return { statusCode: 200, headers, body: JSON.stringify(edificios)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
