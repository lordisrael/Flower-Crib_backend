const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");

const dbConnect = require("./db/database");
const notFoundMiddleware = require("./middleware/not-found");



app.use(cors());
app.use(express.json());

const authRoute = require("./routes/authRoutes.js");

app.use("/api", authRoute);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnect.authenticate();
    console.log("Connection has been established successfully.");
    //await dbConnect(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
