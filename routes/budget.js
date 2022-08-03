var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET budget */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM budget ");
  res.send(results.data);
});

/* GET budget buy trip*/
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM budget WHERE FK_trips_id=${id}`);

    if (results.data.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.status(200).send(results);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to budget */
router.post("/", async function (req, res, next) {
  const { FK_trips_id, name, amount } = req.body;
  const sql = `INSERT INTO budget (FK_trips_id, name, amount) VALUES (${FK_trips_id},'${name}', ${amount});`;
  try {
    let result = await db(sql);

    let sql2 = `SELECT * FROM budget WHERE FK_trips_id=${FK_trips_id}`;

    let budget = await db(sql2);

    res.send(budget.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
