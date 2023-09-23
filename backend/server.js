require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
console.log(process.env);
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/predict", require("./routes/predictRoutes.js"));

app.listen(PORT, () => {
  console.log(`Started Listening on PORT ${PORT}`);
});
