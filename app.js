const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const tripGroupsRouter = require("./routes/tripGroups");
const tripsRouter = require("./routes/trips");
const itineraryRouter = require("./routes/itinerary");
const authRouter = require("./routes/auth");
const yelpRouter = require("./routes/yelp");
const chatRouter = require("./routes/chat");
const listsRouter = require("./routes/lists");
const reactionsRouter = require("./routes/reactions");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tripGroups", tripGroupsRouter);
app.use("/trips", tripsRouter);
app.use("/itinerary", itineraryRouter);
app.use("/", authRouter);
app.use("/yelp", yelpRouter);
app.use("/chat", chatRouter);
app.use("/lists", listsRouter);
app.use("/reactions", reactionsRouter);

module.exports = app;
