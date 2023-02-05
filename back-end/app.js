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
  origin: "http://localhost:3000/",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
};

app.use(express.json());
app.set("trust proxy", 1);
app.set("view engine", "js")
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "../front-end/build"))
)

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(cors(corsOptions));

app.use("/", userRoutes);
app.use("/admin", adminRoutes);



module.exports = app;
