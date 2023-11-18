/*"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
	
  try {
    const client = await clientPromise;

    // const authors = await client.db("bookstore").collection("books").find({}).toArray();
    const respuesta = await client.db("proyecto").collection("edificios").find({}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(respuesta)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};*/
"use strict"
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
      console.log("You are now connected");
    });
   
   const keys = (await redis.keys('edificios_*')).filter(id => id !== 'edificios_N');
   const books = await redis.mget(keys);
 
   books.forEach(toJson);
    return { statusCode: 200, headers, body: JSON.stringify(books)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
