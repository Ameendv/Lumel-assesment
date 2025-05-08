require("rootpath")();
const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
// const connectDB = require("./helpers/db");

// const errorHandler = require("_middleware/error-handler");

// const getErrorCode = require("./_helpers/getErrorCode");





dotenv.config();


app.use(
  express.json()
);




app.use(cors());
app.enable("trust proxy");

//connect to db
// connectDB()


// api routes
app.use("/api/csv-script", require("./controllers/csv.controller"));
app.use("/api/customer", require("./controllers/customer.controller"));





// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.PORT;


app.get("/", async (req, res) => {
  res.send({
    message: "Hello world",
  });
});
app.listen(port, () => console.log("Server listening on port " + port));
