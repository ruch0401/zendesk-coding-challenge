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
app.get("/tickets", (req, res) => {
  const options = {
    method: "GET",
    uri: "https://usc6156.zendesk.com/api/v2/tickets",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(`${process.env.UNAME}:${process.env.PWORD}`).toString(
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

// EXPORTING app TO COMPLY IN CASE OF MULTIPLE TESTS SO THAT EACH TEST CAN START ITS OWN SERVER AT SEPARATE PORTS
module.exports = app;
