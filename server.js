const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

//dot env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewhares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//STATIC FOLDER
app.use(express.static(path.join(__dirname, "./client/build")));

//STATIC ROUTES
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
