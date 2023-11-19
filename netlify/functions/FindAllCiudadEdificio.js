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

    // Obtener todas las claves que comienzan con "edificios_"
    const allEdificiosKeys = await redis.keys("edificios_*");

    // Filtrar las claves para obtener solo las correspondientes a la ciudad especificada
    const edificiosCiudadKeys = allEdificiosKeys.filter(async (key) => {
      const edificioData = await redis.get(key);
      const edificio = toJson(edificioData);
      return edificio.ciudad_id === ciudadId;
    });

    // Obtener los datos de todos los edificios de la ciudad
    const edificiosCiudad = await Promise.all(edificiosCiudadKeys.map(async (key) => {
      const edificioData = await redis.get(key);
      return toJson(edificioData);
    }));

    return { statusCode: 200, headers, body: JSON.stringify(edificiosCiudad) };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, headers, body: JSON.stringify(error.message) };
  }
};
