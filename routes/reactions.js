var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET message reactions
router.get("/", async function (req, res, next) {
  let results = await db(`SELECT * FROM messagesReactions`);
  res.send(results.data);
});

// POST to message reactions
router.post("/post", async function (req, res, next) {
  const { reaction, FK_user_id, FK_message_id } = req.body;

  let response = await db(
    `SELECT * FROM messagesReactions WHERE FK_user_id = ${FK_user_id} AND FK_message_id = ${FK_message_id}`
  );
  //   console.log(response);

  // check to see if current user has already reacted to this message
  if (response.data.length > 0) {
    if (reaction === response.data[0].reaction) {
      const sql = `DELETE FROM messagesReactions WHERE id=${response.data[0].id}`;

      if (response.data[0].reaction === 0) {
        await db(
          `UPDATE messages SET thumbsDownCount=thumbsDownCount-1 WHERE id=${FK_message_id}`
        );
      } else if (response.data[0].reaction === 1) {
        await db(
          `UPDATE messages SET thumbsUpCount=thumbsUpCount-1 WHERE id=${FK_message_id}`
        );
      }

      try {
        await db(sql);

        let results = await db(`SELECT * FROM messagesReactions`);

        res.send(results);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      const sql = `UPDATE messagesReactions SET reaction = ${!response.data[0]
        .reaction} WHERE id=${response.data[0].id}`;

      if (reaction === 0) {
        await db(
          `UPDATE messages SET thumbsDownCount=thumbsDownCount+1, thumbsUpCount=thumbsUpCount-1 WHERE id=${FK_message_id}`
        );
      } else if (reaction === 1) {
        await db(
          `UPDATE messages SET thumbsDownCount=thumbsDownCount-1, thumbsUpCount=thumbsUpCount+1 WHERE id=${FK_message_id}`
        );
      }

      try {
        await db(sql);

        let results = await db(`SELECT * FROM messagesReactions`);

        res.send(results);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  } else {
    const sql = `INSERT INTO messagesReactions (reaction, FK_user_id, FK_message_id) VALUES (${reaction}, ${FK_user_id}, ${FK_message_id});
    `;

    if (reaction === 0) {
      await db(
        `UPDATE messages SET thumbsDownCount=thumbsDownCount+1 WHERE ID=${FK_message_id}`
      );
    } else if (reaction === 1) {
      await db(
        `UPDATE messages SET thumbsUpCount=thumbsUpCount+1 WHERE ID=${FK_message_id}`
      );
    }

    try {
      await db(sql);

      let results = await db(`SELECT * FROM messagesReactions`);

      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
