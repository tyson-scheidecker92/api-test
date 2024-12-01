const express = require("express");
const pkg = require("moment-timezone");

const { utc, tz } = pkg;

const app = express();
const port = process.env.PORT || 3000;

app.get("/time", (req, res) => {
  const timezone = req.query.timezone;
  const currentTime = utc().toISOString();

  if (timezone) {
    const adjustedTime = tz(currentTime, timezone).toISOString();
    return res.json({ currentTime, adjustedTime });
  }

  return res.json({ currentTime });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };
