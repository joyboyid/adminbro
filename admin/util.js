// const bcrypt = require("bcrypt");
// const { User } = require("../models");
// const redis = require("redis");
// const session = require("express-session");

// let RediStore = require("connect-redis")(session);
// let redisClient = redis.createClient();
// const sessionStorage = {
//   store: new RediStore({
//     client: redisClient,
//   }),
//   secret: "this a secret",
//   resave: false,
// };

// async function authenticate(email, password) {
//   const userRecord = await User.findOne({
//     where: { email },
//   });
//   if (userRecord) {
//     const matched = await bcrypt.compare(
//       password,
//       userRecord.encryptedPassword
//     );
//     if (matched) {
//       return userRecord;
//     }
//   }
//   return false;
// }

// module.exports = {
//   authenticate,
//   sessionStorage,
// };

const bcrypt = require('bcrypt');
const { User } = require('../models');
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
const sessionStorage = {
  store: new RedisStore({
    client: redisClient
  }),
  secret: 'this is secret',
  resave: false,
};
async function authenticate(email, password) {
  const userRecord = await User.findOne({
    where: { email }
  });
  if (userRecord) {
    const matched = await bcrypt.compare(password, userRecord.encryptedPassword);
    if (matched) {
      return userRecord;
    }
  }
  return false;
}
module.exports = {
  authenticate,
  sessionStorage,
};

