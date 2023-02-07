const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Email = require("../models/email");
const {
  authenticate,
  ensureAdmin,
  ensureAdminPost,
  logout,
} = require("../middleware/auth");

router.get("/", ensureAdmin, (req, res) => {
  res.send("Admin Panel");
});


router.post("/login", authenticate, (req, res) => {
  res.send({
    token: req.session.admin_token,
  });
});

router.get("/logout", logout, (req, res) => {
  res.send("Logged out");
});

//Newsletter routes

//Get all newsletters
router.get("/newsletters", ensureAdmin, async (req, res) => {
  const newsletters = await Admin.getNewsletters();
  res.json({ newsletters });
});

//Get specific newsletter
router.get("/newsletter/:id", ensureAdmin, async (req, res) => {
  const id = req.params.id;
  const newsletter = await Admin.getNewsletter(id);
  res.json({
    newsletter,
  });
});

//Create newsletter
router.post("/newsletter", ensureAdminPost, async (req, res) => {
  const newsData = await Admin.fetchNewsData();
  const newsletter = await Admin.generateNewsletter();
  return res.json({
    newsletter: newsletter,
  });
});

//Delete newsletter
router.delete("/newsletter/:id", ensureAdmin, async (req, res) => {
  const id = req.params.id;
  const deleteNewsletter = await Admin.deleteNewsletter(id);
  return res.json({
    message: "newsletter deleted",
  });
});

//Publish newsletter to the public
router.patch("/newsletter/:id", ensureAdminPost, async (req, res) => {
  const id = req.params.id;
  const publishNewsletter = await Admin.publishNewsletter(id);
  res.json({
    publishNewsletter,
  });
});

//Email routes

//Get list of subscribers
router.get("/subscribers", ensureAdmin, async (req, res) => {
  const subscribers = await Admin.getSubscribers();
  res.json({ subscribers });
});

module.exports = router;
