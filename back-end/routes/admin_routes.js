const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
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
    token: "valid_token",
  });
});

router.get("/logout", logout, (req, res) => {
  res.send("Logged out");
});

//Newsletter routes

router.get("/newsletters", ensureAdmin, async (req, res) => {
  const newsletters = await Admin.getNewsletters();
  res.json({ newsletters });
});

router.get("/newsletter/:id", ensureAdmin, async (req, res) => {
  const id = req.params.id;
  const newsletter = await Admin.getNewsletter(id);
  res.json({
    newsletter,
  });
});

router.post("/newsletter", ensureAdminPost, async (req, res) => {
  const newsData = await Admin.fetchNewsData();
  const newsletter = await Admin.generateNewsletter();
  console.log(newsletter);
  return res.json({
    newsletter: newsletter,
  });
});

router.delete("/newsletter/:id", ensureAdmin, async (req, res) => {
  const id = req.params.id;
  const deleteNewsletter = await Admin.deleteNewsletter(id);
  return res.json({
    message: "newsletter deleted",
  });
});

router.patch("/newsletter/:id", ensureAdminPost, async (req, res) => {
  const id = req.params.id;
  const publishNewsletter = await Admin.publishNewsletter(id);
  res.json({
    publishNewsletter,
  });
});

module.exports = router;
