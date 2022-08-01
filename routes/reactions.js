var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET message reactions
router.get("/", async function (req, res, next) {
  let { messageId } = req.params;
  let results = await db(`SELECT * FROM messagesReactions`);
  res.send(results.data);
});

// POST to message reactions
router.post("/post", async function (req, res, next) {
  console.log("arrived");
  const { reaction, FK_user_id, FK_message_id, up, down } = req.body;
  const sql = `INSERT INTO messagesReactions (reaction, FK_user_id, FK_message_id) VALUES ('${reaction}', '${FK_user_id}', '${FK_message_id}' );
    UPDATE messages SET thumbsUpCount=thumbsUpCount+${up}, thumbsDownCount=thumbsDownCount+${down} WHERE ID=${FK_message_id}
    `;

  // const messageSql = ` UPDATE messages SET thumbsUpCount='${thumbsUpCount}' AND thumbsDownCount='${thumbsDownCount}' WHERE ID=${FK_message_id}`;
  try {
    await db(sql);
    // await db(messageSql);
    let results = await db(`SELECT * FROM messages WHERE id=${FK_message_id}`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
