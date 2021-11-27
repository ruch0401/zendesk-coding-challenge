const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const request = require("request-promise");

// MIDDLEWARE
app.use(
  cors({
    origin: "*",
  })
);

// ROUTE
app.get("/tickets", async (req, res) => {
  const options = {
    method: "GET",
    uri: "https://zccruchitusc.zendesk.com/api/v2/tickets",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(`${process.env.USERNAME}:${process.env.PASSWORD}`).toString(
          "base64"
        ),
    },
  };

  request(options).then(
    function (response) {
      res.status(200).json(JSON.parse(response));
    },
    function (err) {
      console.log(err.statusCode, err.error);
      res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.error,
      });
    }
  );
});

module.exports = app;
