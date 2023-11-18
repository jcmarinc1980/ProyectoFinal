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

    const arquitectos = await client.db("proyecto").collection("arquitectos").find({_id:id}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(arquitectos)};
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
    
    const id = event.path.split("/").reverse()[0];
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });
   const arquitecto = await redis.get('arquitectos_'+id);
   let arquitectos = [];
   arquitectos.push(book);
   arquitectos.forEach(toJson);
    return { statusCode: 200, headers, body: JSON.stringify(arquitectos)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
