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

function toJson(item) {
  return JSON.parse(item);
}

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    redis.on("connect", function() {
      console.log("Connected to Redis");
    });

    const ciudadId = parseInt(event.path.split("/").reverse()[0]);

    // Buscar la clave del edificio directamente por su ID
    const edificioKey = `edificios_${ciudadId}`;
    const edificio = await redis.get(edificioKey);
    if (!edificio) {
      return { statusCode: 404, headers, body: "Edificio no encontrado en Redis" };
    }
    const edificioData = toJson(edificio);

    return { statusCode: 200, headers, body: JSON.stringify(edificioData) };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, headers, body: JSON.stringify(error.message) };
  }
};
