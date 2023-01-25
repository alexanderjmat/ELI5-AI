const express = require("express");
const axios = require("axios");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const adminRoutes = require("./routes/admin_routes");
const userRoutes = require("./routes/user_routes");
const { SECRET_KEY } = process.env;
const db = require("./db");
const session = require("express-session");
const { authenticate, ensureAdmin } = require("./middleware/auth");

const OPEN_API_KEY = process.env.OPENAI_API_KEY;
const MEDIASTACK_API_KEY = process.env.MEDIASTACK_API_KEY;
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true
}

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
