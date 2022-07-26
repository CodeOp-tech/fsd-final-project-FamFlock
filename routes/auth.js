var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");

// Register a user
router.post("/register", async (req, res) => {
  let { email, username, password, fullname, picture } = req.body;
  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  try {
    let sql = `INSERT INTO users (email, username, password, fullname, picture) VALUES 
    ('${email}', '${username}', '${hashedPassword}', '${fullname}', '${picture}')`;
    await db(sql);

    // send the message
    res.send({ message: "Registration succeeded" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Log in a user
router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    let results = await db(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    if (results.data.length === 0) {
      // if username not found
      res.status(401).send({ error: "Login failed" });
    } else {
      let user = results.data[0]; // the user's row/record from the DB
      let passwordsEqual = await bcrypt.compare(password, user.password);
      if (passwordsEqual) {
        // Passwords match
        let payload = { userid: user.id };
        // Create token containing user ID
        let token = jwt.sign(payload, SECRET_KEY);
        // Also return user (without password)
        delete user.password;
        res.send({
          message: "Login succeeded",
          token: token,
          user: user,
        });
      } else {
        // Passwords don't match
        res.status(401).send({ error: "Login failed" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
