"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "eli5_ai_test"
        : process.env.DATABASE_URL || "eli5_ai";
  }

module.exports = {
    SECRET_KEY,
    PORT,
}