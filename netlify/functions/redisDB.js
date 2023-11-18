"use strict";
const { Redis } = require('ioredis');
const client = new Redis({
    port: 19524, // Redis port
    host: "redis-19524.c262.us-east-1-3.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "QT7x9xRxXEH5o5Sfvb2e2iYN0UOamB5p",
    db: 0, // Defaults to 0
  });
module.exports = client;
