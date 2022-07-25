require("dotenv").config();

// setting the secret key to the key specified in the .env file
const SECRET_KEY = process.env.SECRET_KEY || "my weak (!!) secret key";
const BCRYPT_WORK_FACTOR = 12; // determines "strength" of hashing

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
