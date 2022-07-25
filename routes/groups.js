var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET groups */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM `groups`");
  res.send(results.data);
});

module.exports = router;
