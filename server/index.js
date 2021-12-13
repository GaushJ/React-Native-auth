const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./.env" });
require("./config/db");

app.use(express.json());

//Require user
const UserRouter = require('./api/User');
app.use('/user',UserRouter);

const PORT = 5000;

app.listen(5000, () => {
  console.log(`connected successfully at port ${PORT}`);
});
