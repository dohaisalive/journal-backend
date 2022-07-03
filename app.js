const connectDb = require("./DB/database");
const express = require("express");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const cors = require("cors");
const path = require("path");

//routes
const userRoutes = require("./apis/users/users.routes");

//middlewares
const passport = require("passport");
const pathNotFound = require("./middleware/pathNotFound");
const errorHandling = require("./middleware/errorHandling");

const app = express();
connectDb();
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(cors());

//routes
app.use("/media", express.static(path.join(__dirname, "media")));

app.use(userRoutes);

app.use(pathNotFound);
app.use(errorHandling);

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});