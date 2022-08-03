var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET listsItems */
router.get("/", async function (req, res, next) {
  db("SELECT * FROM listItems")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET listItem by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM listItems WHERE FK_lists_id = ${id}`);
    let listItems = results.data;
    res.send(listItems);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to listItems */
router.post("/", async function (req, res, next) {
  let { FK_lists_id, name, isComplete } = req.body;
  let sql = `INSERT INTO listItems (FK_lists_id, name, isComplete) VALUES ('${FK_lists_id}','${name}','${isComplete}')`;

  try {
    await db(sql);
    let results = await db(
      `SELECT * FROM listItems where FK_lists_id=${FK_lists_id}`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* Update listItem information (PUT) */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;

    if (isComplete !== null) {
      let sql = `
      UPDATE listItems SET isComplete=${isComplete} WHERE ID=${id}`;
      await db(sql);
    }
    // let results = await db(`SELECT * FROM listItems WHERE FK_lists_id = ${id}`);
    res.status(200).send({ message: "Information was successfully updated" });
  } catch (error) {
    res.send({ message: error });
  }
});

/* DELETE listItem from DB */
router.delete("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM listItems WHERE id = ${id}`);
    // let listItems = results.data;
    if (results.data.length === 0) {
      res.status(404).send({ error: "List of Items not found" });
    } else {
      // DELETE
      await db(`DELETE FROM listItems WHERE id = ${id}`);
      // Return updated listItems
      let results = await db(`SELECT * FROM listItems`);
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
