"use strict";
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let DB_URI

process.env.NODE_ENV = "test";

if (process.env.NODE_ENV == "test") {
  DB_URI = "postgresql:///eli5_ai_test";
} else {
  DB_URI = "postgresql:///eli5_ai"
}

let db = new Client({
  connectionString: DB_URI
})

db.connect();

module.exports = db;