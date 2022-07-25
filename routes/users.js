var express = require("express");
var router = express.Router();
const db = require("../model/helper");

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

module.exports = router;
