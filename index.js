const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const port = 3000;

// create application/json parser
var jsonParser = bodyParser.urlencoded({ extended: true });

app.get("/badges/statistics", jsonParser, function (req, res) {
  let req_user_id = req.query.user_id;
  if (req_user_id !== null && req_user_id !== undefined && req_user_id > 0) {
    res.send({
      statistics_response,
    });
  } else {
    res.statusCode = 400;
    res.send("Invalid request");
  }
});

app.get("/date-filtered-badges", jsonParser, function (req, res) {
  let req_user_id = req.query.user_id;
  if (req_user_id !== null && req_user_id !== undefined && req_user_id > 0 && req.query.date) {
    let req_unsplit_date = req.query.date.split(" ")[0];
    let req_split_date = req_unsplit_date.split("-");
    let req_date = parseInt(req_split_date[2]);
    let req_month = parseInt(req_split_date[1]);
    let req_year = parseInt(req_split_date[0]);
    let date = new Date(req_year, req_month - 1, req_date + 1, 0, 0, 0);

    let limit = date.getDay() - 2;
    limit <= 0 ? (limit += 7) : (limit += 0);
    let response = date_filtered_badges_response;
    response.all_badges = [];
    for (let i = 0; i < limit; ++i) {
      let badges_for_date = {};
      Object.assign(badges_for_date, sample_date_badge);
      badges_for_date.date = new Date(req_year, req_month - 1, req_date - i, 0, 0, 0);
      response.all_badges.push(badges_for_date);
    }
    res.send({ limit: limit, date_filtered_badges_response });
  } else {
    res.statusCode = 400;
    res.send("Invalid request");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

var statistics_response = {
  weekly_badges: {
    red: {
      count: 1,
    },
    yellow: {
      count: 7,
      reason: ["Late check in daily attendance", "Not completing a single task in a day"],
    },
    green: {
      count: 3,
      reason: ["Completed more than 80% of assignments in a module", "Completing more than 10 hours in a day"],
    },
  },
  total: {
    red: {
      count: 38,
    },
    yellow: {
      count: 240,
      reason: ["Late check in daily attendance", "Late check in class attendance", "Not completing 10 hours a day"],
    },
    green: {
      count: 40,
      reason: [
        "Completed more than 80% of assignments in a module",
        "On time check in daily attendance",
        "On time check in class attendance",
      ],
    },
  },
};

var date_filtered_badges_response = {
  labels: [
    {
      count: 24,
      badge: "On time check in daily attendance",
    },
    {
      count: 22,
      badge: "On time check in class attendance",
    },
    {
      count: 12,
      badge: "Completing 10 hours per day",
    },
    {
      count: 20,
      badge: "Completed more than 80% of assignments in a week for a module",
    },
    {
      count: 20,
      badge: "Late check in daily attendance",
    },
    {
      count: 20,
      badge: "Late check in class attendance",
    },
    {
      count: 20,
      badge: "Not completing 10 hours/ Early check out",
    },
    {
      count: 20,
      badge: "Not finishing a single task in a day",
    },
  ],
  all_badges: [],
};

var sample_date_badge = {
  date: "",
  badges: [
    {
      event: "On time attendance check in",
      badge: {
        color: "green",
        reason: "Checked in at 9:00:03",
        issued_at: "2020-10-23T00:00",
      },
    },
    {
      event: "Late class check in",
      badge: {
        color: "yellow",
        reason: "Checked in at 9:52:46",
        issued_at: "2020-10-23T00:00",
      },
    },
  ],
};
