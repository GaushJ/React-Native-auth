const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log("connection failed");
    console.log(err);
  });
