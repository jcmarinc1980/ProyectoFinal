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

    const arquitectoId = parseInt(event.path.split("/").reverse()[0]);

    // Obtener todas las claves que comienzan con "edificios_"
    const allEdificiosKeys = await redis.keys("edificios_*");

    // Obtener los datos de todos los edificios
    const edificiosData = await Promise.all(allEdificiosKeys.map(async (key) => {
      const edificioData = await redis.get(key);
      return toJson(edificioData);
    }));

    // Filtrar los edificios por arquitecto_id
    const edificiosArquitecto = edificiosData.filter((edificio) => edificio.arquitecto_id === arquitectoId);

    return { statusCode: 200, headers, body: JSON.stringify(edificiosArquitecto) };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, headers, body: JSON.stringify(error.message) };
  }
};
