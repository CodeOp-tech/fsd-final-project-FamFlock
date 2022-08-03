const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const db = require("../model/helper");

/* Ensure user logged in */
function ensureUserLoggedIn(req, res, next) {
  let token = _getToken(req);

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/* Ensures is same user */
function ensureSameUser(req, res, next) {
  let token = _getToken(req);

  try {
    let payload = jwt.verify(token, SECRET_KEY);
    if (payload.id === Number(req.params.id)) {
      next();
    } else {
      res.status(403).send({ error: "Forbidden" });
    }
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/* Get token */
function _getToken(req) {
  if (!("authorization" in req.headers)) {
    return "";
  }

  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");

  return str === "Bearer" ? token : "";
}

/*List must exists*/
function listMustExist (req, res, next) {
  try {
    const {id} = req.params;
    // check into DB if list exist
    const results = await db(`SELECT * FROM lists WHERE id= ${id}`)
    if(results.data.length) {
    next();
    }
    // send 404 if not
    else res.status(404).send({message: "List not found"});
  } catch (err) {
    res.status(500).send(err);
  }
} 

/*Item must exists*/
function itemMustExist (req, res, next) {
  try {
    const {id} = req.params;
    // check into DB if list exist
    const results = await db(`SELECT * FROM listItems WHERE id= ${id}`)
    if(results.data.length) {
    next();
    }
    // send 404 if not
    else res.status(404).send({message: "Item not found"});
  } catch (err) {
    res.status(500).send(err);
  }
} 

module.exports = {
  ensureUserLoggedIn,
  ensureSameUser,
  listMustExist,
  itemMustExist
};
