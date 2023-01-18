"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { USERNAME, SECRET_KEY } = require("../config");
