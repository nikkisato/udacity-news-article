const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const mockAPIResponse = require("./mockAPI.js");

require("dotenv").config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static("dist"));

const apiKey = process.env.API_KEY;
console.log(`Your api key is ${apiKey}`); // Used for testing API key entry

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/postData", async (req, res) => {
  console.log("Getting Data");

  let formText = req.body.url;
  const baseURL = "https://api.meaningcloud.com/sentiment-2.1?";

  const result = await fetch(`${baseURL}key=${apiKey}&lang=en&url=${formText}`, {
    method: "POST",
  });
  try {
    const data = await result.json();

    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});
