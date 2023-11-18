/*"use strict"

const headers = require('./headersCORS');

const rabbitPromise = require('./rabbitMQ');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return {statusCode: 200,headers,body: "OK"};
  }

  try {
    
    const channel = await rabbitPromise();
    const request = `{"method":"INSERT","body":${event.body}}`;
    await channel.sendToQueue("edificios", Buffer.from(request));

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
*/

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
   
   const data = JSON.parse(event.body);
   const result = await redis.set('edificios_'+data.id,event.body);
   console.log({result});
   if(result)
     await redis.incr('edificios_N');

   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
