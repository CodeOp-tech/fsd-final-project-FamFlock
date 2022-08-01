var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");

// /* Join to Json */
function joinToJson(results) {
  // Create array of  objs

  let row0 = results.data[0];

  let allGroups = results.data.map((row) => ({
    group_id: row.group_id,
    groupName: row.name,
  }));

  cleanGroups = [];

  const groups = allGroups.filter((e) => {
    let isDuplicate = cleanGroups.includes(e.group_id);
    if (!isDuplicate) {
      cleanGroups.push(e.group_id);
      console.log(isDuplicate, e.group_id, cleanGroups);
      return true;
    }
    return false;
  });
  //map over clean groups
  // for each id in clean groups
  // create an group object with a nested array of trip objects that belong to this group id.

  let allTrips = results.data.map((row) => ({
    trip_id: row.trip_id,
    startDate: row.startDate,
    endDate: row.endDate,
    desination: row.destination,
    group_id: row.group_id,
  }));

  //console.log(allTrips);

  let trips = groups.map((e) =>
    allTrips.filter((t) => e.group_id === t.group_id)
  );

  //console.log(cleanGroups);
  let user = {
    id: row0.user_id,
    email: row0.email,
    username: row0.username,
    password: row0.password,
    fullname: row0.fullname,
    picture: row0.picture,
    groups,
    trips,
  };

  return user;
}

/* GET users */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM users");
  res.send(results.data);
});

/* GET user by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let sql = `SELECT DISTINCT users.*, users.id AS user_id, trips.id AS trip_id, tripGroups.id AS group_id, tripGroups.name, trips.startDate, trips.endDate, trips.destination
    FROM users LEFT JOIN users_tripGroups ON users.id = users_tripGroups.FK_users_id
    INNER JOIN tripGroups ON tripGroups.id = users_tripGroups.FK_tripGroups_id
    INNER JOIN trips ON trips.FK_tripGroups_id = tripGroups.id  WHERE users.id = ${id}`;
    //let results = await db(`SELECT * FROM users WHERE id = ${id}`);
    let results = await db(sql);
    // let user = results.data;
    if (results.data.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      let user = joinToJson(results);
      res.send(user);
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
