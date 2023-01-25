const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin_routes");
const userRoutes = require("./routes/user_routes");
const { SECRET_KEY } = process.env;
const session = require("express-session");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
};

app.use(express.json());
app.set("trust proxy", 1);
app.use(cookieParser());

app.use(
  session({
    secret: SECRET_KEY,
    cookie: { maxAge: 100000 },
  })
);

app.use(cors(corsOptions));

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
