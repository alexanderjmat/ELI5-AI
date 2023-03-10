"use strict";
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let DB_URI

if (process.env.NODE_ENV == "test") {
  DB_URI = "postgresql:///eli5_ai_test";
} else {
  DB_URI = process.env.DATABASE_URL;
}

let db = new Client({
  connectionString: "postgresql:///eli5_ai_test",
})

db.connect();

module.exports = db;