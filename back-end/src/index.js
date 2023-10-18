const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const workshopRouter = require("./routers/workshop");
const enrollmentRouter = require("./routers/enrollment");
const feedbackRouter = require("./routers/feedback");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authentication"
  );

  next();
});

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(userRouter);
app.use(workshopRouter);
app.use(enrollmentRouter);
app.use(feedbackRouter);

app.listen(port, () => {
  console.log("Server is upp on port " + port);
});
