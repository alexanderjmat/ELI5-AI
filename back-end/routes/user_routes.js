const express = require("express");
const router = express.Router();
const Client = require("../models/user");

router.get("/", (req, res) => {
  return res.json({
    message: "Welcome to ELI5-AI!",
  });
});

router.get("/newsletters", async (req, res) => {
  const newsletters = await Client.getNewsletters();
  return res.json({
    newsletters: newsletters,
  });
});

router.get("/newsletter", async (req, res) => {
  const newsletter = await Client.getCurrentNewsletter();
  return res.json({ newsletter });
});

module.exports = router;
