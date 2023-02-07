const express = require("express");
const cors = require("cors");
const path = require("path")
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin_routes");
const userRoutes = require("./routes/user_routes");
const { SECRET_KEY } = process.env;
const session = require("express-session");

const app = express();

const corsOptions = {
  origin: ["https://eli5-ai.netlify.app", "https://eli5-ai.com"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
};

app.use(express.json());
app.set("trust proxy", 1);
app.set("view engine", "js")
app.use(cookieParser());

app.enable('trust proxy');
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: { 
      secure: true,
      maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(cors(corsOptions));
app.use("/", userRoutes);
app.use("/admin", adminRoutes);



module.exports = app;
