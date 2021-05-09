const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

// Settings
app.set("host", process.env.APP_URL || "http://localhost");
app.set("port", process.env.PORT || 5000);
app.set("clientUrl", process.env.CLIENT_URL || "http://localhost");
app.set("clientPort", process.env.CLIENT_PORT || 3000);

// importing Middlewares
const AuthMiddleware = require("./middleware/AuthMiddleware");

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: app.get("clientUrl") + ":" + app.get("clientPort"), // <-- location of the react app were connecting to
    credentials: true
  })
);

// importing routes
const UserRoutes = require("./routes/UserRoute");
const PostRoutes = require("./routes/PostRoute");
const AuthRoutes = require("./routes/AuthRoute");

//Route
app.use("/api/users", AuthMiddleware.verifyToken, UserRoutes);
app.use("/api/posts", AuthMiddleware.verifyToken, PostRoutes);
app.use("/api/", AuthRoutes);

app.use("/", (req, res) => {
  res.send("Hello World form NodeJS express.");
});

app.listen(app.get("port"), () =>
  console.log("Start server on " + app.get("host") + ":" + app.get("port"))
);
