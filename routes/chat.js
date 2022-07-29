var express = require("express");
var router = express.Router();
require("dotenv").config();
const db = require("../model/helper");
const Pusher = require("pusher");

// Number of prior messages to GET
const GET_MESSAGE_COUNT = 10;

// Initialize the Pusher connection
const channel = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

// GET the most recent messages for channel
router.get("/:groupId", async function (req, res) {
  let { groupId } = req.params;

  try {
    let sql = `
            SELECT * FROM messages
            WHERE groupId = ${groupId}
            ORDER BY dateTime DESC 
            LIMIT ${GET_MESSAGE_COUNT}
        `;
    let results = await db(sql);
    res.send(results.data.reverse()); // return in chronological order
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Save new message in DB and publish to Pusher
router.post("/:groupId/:senderId", async function (req, res) {
  let { senderId, groupId } = req.params;
  let { text, socketId } = req.body;

  // Escape possible single quotes in text before writing to the DB
  let text4db = text.replace(/\'/g, "\\'");

  // Add the message to the DB
  let completeMsg = null;
  try {
    let sql = `
            INSERT INTO messages (senderId, groupId, text, thumbsUpCount, thumbsDownCount)
            VALUES (${senderId}, ${groupId}, '${text4db}', 0, 0);
            SELECT LAST_INSERT_ID()
        `;
    let results = await db(sql);
    let completeMsgId = results.data[0].insertId;
    // Return "complete" message (with ID and date/time)
    results = await db(`SELECT * FROM messages WHERE id = ${completeMsgId}`);
    completeMsg = results.data[0];
  } catch (err) {
    res.status(500).send({ error: err.message });
    return;
  }

  // What's the channel name for these two users? Something like 'channel-1-2'
  let channelName = "channel-" + groupId;

  // Publish message to Pusher to broadcast on the users' channel
  // Include sender's socketId so sender won't receive message
  channel.trigger(channelName, "message", completeMsg, { socket_id: socketId });

  // Return message to sender in response instead; it's faster
  res.send(completeMsg);
});

/* 
 Message Reactions table
*/

// GET message reactions
router.get("/reactions/:messageId", async function (req, res, next) {
  let { messageId } = req.params;
  let results = await db(
    `SELECT * FROM messagesReactions WHERE FK_message_id = ${messageId}`
  );
  res.send(results.data);
});

// POST to message reactions
router.post("/reactions", async function (req, res, next) {
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
