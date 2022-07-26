var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");

/* GET users */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM users");
  res.send(results.data);
});

/* GET user by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM users WHERE id = ${id}`);
    let user = results.data;
    if (user.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(user[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//For now Im only letting the user update its email and password

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { picture, fullname, email, username, password } = req.body;

    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    console.log(hashedPassword);
    let sql = `
              UPDATE users SET picture = '${picture}', fullname = '${fullname}', email = '${email}', username = '${username}', password = '${hashedPassword}' WHERE id = ${id}`;
    await db(sql);
    res.status(200).send({ message: "Information updated successfully" });
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
