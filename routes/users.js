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

/* Update user information (PUT) */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { picture, fullname, email, username, currentpassword, newpassword } =
      req.body;

    if (picture) {
      let sql = `
      UPDATE users SET picture='${picture}' WHERE ID=${id}`;
      await db(sql);
    }

    if (fullname) {
      let sql = `
      UPDATE users SET fullname='${fullname}' WHERE ID=${id}`;
      await db(sql);
    }

    if (username) {
      let sql = `
      UPDATE users SET username='${username}' WHERE ID=${id}`;
      await db(sql);
    }

    if (email) {
      let sql = `
      UPDATE users SET email='${email}' WHERE ID=${id}`;
      await db(sql);
    }

    if (newpassword) {
      let results = await db(`SELECT * FROM users WHERE id = '${id}'`);
      if (results.data.length === 0) {
        // if username not found
        res.status(401).send({ error: "Login failed" });
      } else {
        let user = results.data[0]; // the user's row/record from the DB

        let passwordsEqual = await bcrypt.compare(
          currentpassword,
          user.password
        );

        if (passwordsEqual) {
          let hashedPassword = await bcrypt.hash(
            newpassword,
            BCRYPT_WORK_FACTOR
          );

          console.log(hashedPassword);

          let sql = `
              UPDATE users SET password ='${hashedPassword}' WHERE id = ${id}`;
          await db(sql);
        }
      }
    }
    res.status(200).send({ message: "Information was successfully updated" });
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
