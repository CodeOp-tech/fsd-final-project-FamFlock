var express = require("express");
const res = require("express/lib/response");
var router = express.Router();
const db = require("../model/helper");

// Get all user's trips list
router.get("/", function (req, res, next) {
  db("SELECT * FROM trips;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// Get trip by id

module.exports = router;
