const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const FormData = require("form-data");
const fetch = require("node-fetch");

const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY;
const apiUrl = "https://api.meaningcloud.com/sentiment-2.1";

const app = express();
app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

const formdata = new FormData();

formdata.append("key", apiKey);
formdata.append("txt", "Hello");
formdata.append("lang", "en");

const requestOptions = {
  method: "POST",
  body: formdata,
};

const response = fetch(
  `https://api.meaningcloud.com/sentiment-2.1?&key=${process.env.API_KEY}&lang=en&txt=hello`,
  requestOptions
)
  .then((response) => ({
    status: response.status,
    body: response.json(),
  }))
  .then(({ status, body }) => console.log(status, body))
  .catch((error) => console.log("error", error));

console.log(response);
