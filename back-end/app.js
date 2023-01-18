const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const pg = require("pg")

const OPEN_API_KEY = process.env.OPENAI_API_KEY;
const MEDIASTACK_API_KEY = process.env.MEDIASTACK_API_KEY;

app.get("/", (req, res) => {
  res.send("ELI5-AI server running");
});

app.post("/admin", (req, res) => {

})

app.get("/news", async (req, res) => {
  const response = await axios.get(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&keywords=AI Machine Learning Artificial Intelligence&categories=science,technology&languages=en&date=2023-01-08,2023-01-15`
  );
  const data = response.data.data;
  let parsedData = data.map(entry => {
    return {
        title: entry.title,
        url: entry.url,
        source: entry.source,
        date: entry.published_at
    }
  })

  return res.json({
    parsedData
  });
});

module.exports = app;
