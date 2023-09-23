const express = require("express");
const router = express.Router();
const predictController = require("../controllers/predictController");

router
  .route("/")
  .post(predictController.predict_sent)
  .get((req, res) => res.send("hello"));

router.route("/link").post(predictController.predict_link);

module.exports = router;
