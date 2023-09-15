const asyncHandler = require("express-async-handler");
var request = require("request-promise");

const predict_sent = asyncHandler(async (req, res) => {
  let text = req.body.text;
  if (!text) {
    return res.status(400).send("Enter text to Predict");
  }
  console.log(text);
  const ans = await request({
    uri: "http://localhost:5000/predict",
    body: { text: text },
    method: "POST",
    json: true,
  });
  res.send(ans);
});

module.exports = { predict_sent };
