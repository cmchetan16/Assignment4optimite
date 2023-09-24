const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DataBase_connection, { useNewUrlParser: true })
  .then(
    () => console.log("MongoDB Connected"),
    (err) => console.log(err)
  );

app.use("/", route);

app.listen(PORT, () => {
  console.log(`app running on${PORT}`);
});
