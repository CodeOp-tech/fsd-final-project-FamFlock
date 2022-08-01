var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET lists */
router.get("/", async function (req, res, next) {
  db("SELECT * FROM lists")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET list by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM lists WHERE id = ${id}`);
    let lists = results.data;
    if (lists.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(lists[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to lists */
router.post("/", async function (req, res, next) {
  let { name, isComplete } = req.body;
  let sql = `INSERT INTO lists (name, isComplete) VALUES ('${name}','${isComplete}')`;

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
    const { name, isComplete } = req.body;

    if (name) {
      let sql = `
      UPDATE lists SET name='${name}' WHERE ID=${id}`;
      await db(sql);
    }

    if (isComplete) {
      let sql = `
      UPDATE lists SET isComplete='${isComplete}' WHERE ID=${id}`;
      await db(sql);
    }

    res.status(200).send({ message: "Information was successfully updated" });
  } catch (error) {
    res.send({ message: error });
  }
});

/* DELETE list from DB */
router.delete("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM lists WHERE id = ${id}`);
    // let lists = results.data;
    if (results.data.length === 0) {
      res.status(404).send({ error: "List not found" });
    } else {
      // DELETE
      await db(`DELETE FROM lists WHERE id = ${id}`);
      // Return updated lists
      let results = await db(`SELECT * FROM lists`);
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
