const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const FormData = require("form-data");
const fetch = require("node-fetch");
const mockAPIResponse = require("./mockAPI.js");

const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY;
const apiUrl = "https://api.meaningcloud.com/sentiment-2.1";

const app = express();
app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/data", (req, res) => {
  const formdata = new FormData();

  formdata.append("key", apiKey);
  formdata.append("txt", req.body);
  formdata.append("lang", "en");

  const requestOptions = {
    method: "POST",
    credential: "same-origin",
    body: formdata,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = fetch(`https://api.meaningcloud.com/sentiment-2.1`, requestOptions)
    .then((response) => ({
      status: response.status,
      body: response.json(),
    }))
    .then(({ status, body }) => console.log(status, body))
    .catch((error) => console.log("error", error));

  return response;
});
