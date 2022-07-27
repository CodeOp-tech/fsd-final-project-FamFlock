var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* Join to Json */
function joinToJson(results) {
  // Create array of applicants objs
  let users = results.data.map((row) => ({
    id: row.id,
    email: row.email,
    username: row.username,
    password: row.password,
    fullname: row.fullname,
    picture: row.picture,
  }));
  // Create posts obj from first row
  let row0 = results.data[0];
  console.log(results.data);
  let posts = {
    id: row0.id,
    name: row0.name,
    users,
  };
  return posts;
}

/* GET trip groups */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM `tripGroups`");
  res.send(results.data);
});

/* GET trip user by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM tripGroups WHERE id = ${id}`);
    let tripGroup = results.data;
    if (tripGroup.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(tripGroup[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to tripGroups */
router.post("/", async function (req, res, next) {
  const { name } = req.body;
  const sql = `INSERT INTO tripGroups (name) VALUES ('${name}')`;

  try {
    await db(sql);
    let results = await db("SELECT * FROM tripGroups");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET groups with left join onto users */
router.get("/users/:id", async function (req, res, next) {
  let { id } = req.params;
  // let sql = `SELECT * FROM users WHERE userID = ${id}`;

  let sql = `SELECT tripGroups.*, users_tripGroups.* , users.*
  FROM tripGroups LEFT JOIN users_tripGroups ON tripGroups.id = users_tripGroups.FK_tripGroups_id 
  LEFT JOIN users ON users_tripGroups.FK_users_id = users.id  WHERE tripGroups.id = ${id}
  `;

  try {
    let results = await db(sql);
    let user = joinToJson(results);
    // res.send(results.data);

    // let user = results.data[0];
    // delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
