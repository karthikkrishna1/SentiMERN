const asyncHandler = require("express-async-handler");
var request = require("request-promise");
const cheerio = require("cheerio");

const predict_sent = asyncHandler(async (req, res) => {
  let text = req.body.text;
  if (!text) {
    return res.status(400).send("Enter text to Predict");
  }
  console.log(text);
  const ans = await request({
    uri: "http://127.0.0.1:5000/predict",
    body: { text: text },
    method: "POST",
    json: true,
  });
  res.send(ans);
});

const predict_link = asyncHandler(async (req, res) => {
  let link = req.body.text;
  console.log(link);
  if (!link) {
    return res.status(400).send("Enter link to Predict");
  }

  const page = await request({
    uri: link,
    method: "GET",
    json: true,
  });
  const $ = cheerio.load(page);
  let text = "";
  let heading = "";
  $("p").each((idx, el) => {
    text = text + " " + $(el).text();
  });

  $("h1").each((idx, el) => {
    heading = heading + (idx === 0 ? heading + ` ` + $(el).text() : "");
    console.log(idx);
  });

  console.log(text);
  const ans = await request({
    uri: "http://localhost:5001/predict",
    body: { text: text },
    method: "POST",
    json: true,
  });
  return res.json({ heading, ans });
});

module.exports = { predict_sent, predict_link };
