const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

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

module.exports = {
  ensureUserLoggedIn,
  ensureSameUser,
};
