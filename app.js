const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const request = require("request-promise");
const bodyParser = require("body-parser");

// MIDDLEWARE
app.use(
  cors({
    origin: "*",
  })
);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Global variable declaration space
const base64token = Buffer.from(
  `${process.env.UNAME}:${process.env.PWORD}`
).toString("base64");

// ROUTE - To get a list of tickets
app.get("/tickets", async (req, res) => {
  const options = {
    method: "GET",
    uri: "https://usc6156.zendesk.com/api/v2/tickets",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64token}`,
    },
  };

  request(options).then(
    (response) => {
      res.status(200).json(JSON.parse(response));
    },
    (err) => {
      console.log(err.statusCode, err.error);
      res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.error,
      });
    }
  );
});

// ROUTE - to post a ticket after getting relevant data from the user
app.post("/ticket", urlencodedParser, async (req, res) => {
  const payload = {
    ticket: {
      comment: {
        body: `${req.body.subject}`,
      },
      priority: "urgent",
      subject: `${req.body.comment}`,
    },
  };

  const options = {
    method: "POST",
    uri: "https://usc6156.zendesk.com/api/v2/tickets",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64token}`,
    },
    body: payload,
    json: true,
  };

  request(options).then(
    (response) => {
      const message = `Ticket with subject "${response.ticket.subject}" and comment "${response.ticket.description}" has been successfully created. Please navigate back to the browser and click on 'Get All Tickets' to view your created ticket`;
      res.send(message);
    },
    (err) => {
      console.log(err),
        res.status(err.statusCode).json({
          statusCode: err.statusCode,
          message: err.message,
        });
    }
  );
});

// ROUTE - to implement basic search functionality
app.get("/search", urlencodedParser, async (req, res) => {
  const queryString = req.query.query;
  const options = {
    url: `https://usc6156.zendesk.com/api/v2/search.json?query=${queryString}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64token}`,
    },
  };

  request(options).then(
    (response) => {
      res.status(200).json(JSON.parse(response));
    },
    (err) => {
      console.log(err);
    }
  );
});

// EXPORTING app TO COMPLY IN CASE OF MULTIPLE TESTS SO THAT EACH TEST CAN START ITS OWN SERVER AT SEPARATE PORTS
module.exports = app;
