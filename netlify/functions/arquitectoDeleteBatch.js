"use strict";

const { MongoClient } = require("mongodb");
const headers = require("./headersCORS");

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    // Establece la conexión a MongoDB
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    const id = parseInt(event.path.split("/").reverse()[0]);

    // Intenta eliminar el libro con el ID proporcionado
    const result = await client.db("proyecto").collection("arquitectos").findOneAndDelete({ _id: id });

    if (result.value) {
      console.log("Libro eliminado:", result.value);
      return { statusCode: 200, headers, body: JSON.stringify(result.value) };
    } else {
      console.log("Libro no encontrado");
      return { statusCode: 404, headers, body: "Libro no encontrado" };
    }
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    return { statusCode: 500, headers, body: JSON.stringify(error) };
  } finally {
    // Cierra la conexión a MongoDB después de realizar la operación
    if (client) {
      client.close();
    }
  }
};
