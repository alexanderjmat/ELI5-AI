const express = require("express");
const router = express.Router();
const Client = require("../models/user");
const Email = require("../models/email")

router.get("/", (req, res) => {
  return res.json({
    message: "Welcome to ELI5-AI!",
  });
});

router.get("/newsletter", async (req, res) => {
  const newsletter = await Client.getCurrentNewsletter();
  return res.json({ newsletter });
});

router.post("/subscribe", async (req, res) => {
  const email = req.body.email
  const subscribe = await Client.subscribe(email)
  res.send("Thanks for subscribing! If you are not already subscribed, we've sent you a confirmation email.")

})

router.get("/confirm-email", async (req, res) => {
  const code = req.query.code
  const tryConfirm = await Client.confirmSubscription(code)
  if (tryConfirm) {
    res.send(`Your email is confirmed! Thanks so much for subscribing to ELI5-AI`)
  } else res.send("Invalid link.")
})

router.get("/unsubscribe", async (req, res) => {
  const code = req.query.code;
  const tryUnsubscribe = await Email.unsubscribe(code)
  if (tryUnsubscribe) {
    res.send("You have successfully unsubscribed. You will no longer receive emails from ELI5-AI unless you subscribe again.")
  } else {
    res.send("Invalid link.")
  }
})

module.exports = router;
