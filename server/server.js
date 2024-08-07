const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const dataDB = require("./db/db");
const appRouter = require("./routes/userRouter");

// middlware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

// baza mongoose
dataDB();

// router
app.use("/", appRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}-portda ishladi`);
});
