var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET lists */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM lists");
  res.send(results.data);
});

/* GET list by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM lists WHERE id = ${id}`);
    let list = results.data;
    if (list.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(list[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to lists */
router.post("/", async function (req, res, next) {
  const {
    destin,
    decideDates,
    bookFlight,
    bookAccom,
    essent,
    planAct,
    decideTrans,
    splitPlan,
    reservations,
  } = req.body;
  const sql = `INSERT INTO lists (destin, decideDates, bookFlight, bookAccom, essent, planAct, decideTrans, splitPlan, reservations) VALUES ('${destin}','${decideDates}','${bookFlight}','${bookAccom}','${essent}','${planAct}','${decideTrans}','${splitPlan}','${reservations}' )`;

  try {
    await db(sql);
    let results = await db("SELECT * FROM lists");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* Update list information (PUT) */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      destin,
      decideDates,
      bookFlight,
      bookAccom,
      essent,
      planAct,
      decideTrans,
      splitPlan,
      reservations,
    } = req.body;

    if (destin) {
      let sql = `
      UPDATE lists SET destin='${destin}' WHERE ID=${id}`;
      await db(sql);
    }

    if (decideDates) {
      let sql = `
      UPDATE lists SET decideDates='${decideDates}' WHERE ID=${id}`;
      await db(sql);
    }

    if (bookFlight) {
      let sql = `
      UPDATE lists SET bookFlight='${bookFlight}' WHERE ID=${id}`;
      await db(sql);
    }

    if (bookAccom) {
      let sql = `
      UPDATE lists SET bookAccom='${bookAccom}' WHERE ID=${id}`;
      await db(sql);
    }

    if (essent) {
      let sql = `
      UPDATE lists SET essent='${essent}' WHERE ID=${id}`;
      await db(sql);
    }

    if (planAct) {
      let sql = `
      UPDATE lists SET planAct='${planAct}' WHERE ID=${id}`;
      await db(sql);
    }

    if (decideTrans) {
      let sql = `
      UPDATE lists SET decideTrans='${decideTrans}' WHERE ID=${id}`;
      await db(sql);
    }

    if (splitPlan) {
      let sql = `
      UPDATE lists SET splitPlan='${splitPlan}' WHERE ID=${id}`;
      await db(sql);
    }

    if (reservations) {
      let sql = `
              UPDATE lists SET reservations='${reservations}' WHERE id = ${id}`;
      await db(sql);
    }

    res.status(200).send({ message: "Information was successfully updated" });
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
