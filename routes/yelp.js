var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
require("dotenv").config();

const YELP_BASE_URL = "https://api.yelp.com/v3";

router.get("/", (req, res) => {
  res.send({ message: "Please make a Yelp request!" });
});

// Code Source: Jim's Proxy Demo.

/**
 * Catch-all proxy route
 * Replaces our server hostname (and some distinguishing path string like /yelp)
 * with the third-party API's hostname, sends the request, and returns the
 * response to our client.
 **/

router.get("*", async (req, res) => {
  // Replace 'http://localhost:5000/yelp' with Yelp base URL
  let url = req.originalUrl.replace(/^.*?\/yelp/, YELP_BASE_URL);
  //append filters

  let options = {
    headers: { Authorization: "Bearer " + process.env.YELP_API_KEY },
  };

  try {
    let response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      res.status(response.status).send(data);
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    if (err.response) {
      // Server responded
      let r = err.response;
      res.status(r.status).send({ error: r.statusText });
    } else {
      // Server not reached
      res.status(500).send({ error: `Network error: ${err.message}` });
    }
  }
});

module.exports = router;
