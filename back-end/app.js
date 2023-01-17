const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

const OPEN_API_KEY = process.env.OPENAI_API_KEY;
const MEDIASTACK_API_KEY = process.env.MEDIASTACK_API_KEY;

app.get("/", (req, res) => {
  res.send("ELI5-AI server running");
});

app.get("/news", async (req, res) => {
  const response = await axios.get(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&keywords=AI Machine Learning Artificial Intelligence&categories=science,technology&languages=en`
  );
  const data = response.data.data;
  let parsedData = data.map(entry => {
    return {
        title: entry.title,
        description: entry.description,
        source: entry.url
    }
  })

  return res.json({
    parsedData
  });
});

module.exports = app;
