const express = require("express");
const axios = require("axios");
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors");
const pg = require("pg")
const { SECRET_KEY } = require("./config")



app.use(express.json());

const OPEN_API_KEY = process.env.OPENAI_API_KEY;
const MEDIASTACK_API_KEY = process.env.MEDIASTACK_API_KEY;

const SECRET_KEY = process.env.SECRET_KEY || "testkey";

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Unauthorized.");
  }
}

app.get("/", (req, res) => {
  res.send("ELI5-AI server running");
});

app.get("/admin", authenticate, (req, res) => {
  res.send('Admin portal home page')

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
