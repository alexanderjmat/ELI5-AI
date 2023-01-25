"use strict";
const { JSONCookie } = require("cookie-parser");
const { parseJSON } = require("date-fns");
const { de } = require("date-fns/locale");
const jwt = require("jsonwebtoken");
const { USERNAME, SECRET_KEY } = process.env;

function authenticate(req, res, next) {
  try {
    const { username, password } = req.body;
    if (username == USERNAME && password == SECRET_KEY) {
      req.session.admin_token = jwt.sign(username, SECRET_KEY);
      req.session.save();
      next();
    } else {
      console.log("incorrect username/password");
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (e) {
    return e;
  }
}

function ensureAdmin(req, res, next) {
  try {
    const cookie = req.cookies.admin_token;
    const session = req.session.admin_token;
    console.log(cookie, session)
    switch (cookie || session) {
      case cookie:
        let decodeCookie = jwt.verify(cookie, SECRET_KEY);
        console.log(decodeCookie)
        if (decodeCookie) {
          next();
        } else {
          res.status(401).json({
            message: "unauthorized",
          });
        }
        break;
      case session:
        let decodeSession = jwt.verify(session, SECRET_KEY);
        if (decodeSession) {
          next();
        } else {
          res.status(401).json({
            message: "unauthorized",
          });
        }        
    }
    if (!cookie && !session) {
      res.status(401).json({
        message: "unauthorized",
      });
    }
  } catch (e) {
    return e;
  }
}

function ensureAdminPost(req, res, next) {
  const cookie = req.body.headers.Cookie 
  console.log(cookie)
  console.log(req)
  if (cookie) {
    let decodeCookie = jwt.verify(cookie, SECRET_KEY)
    if (decodeCookie) {
      next()
    } else {
      res.status(401).json({
        message: "unauthorized"
      })
    }
  } else {
    res.status(401).json({
      message: "unauthorized"
    })
  }
}

function logout(req, res, next) {
  try {
    const cookie = req.cookies.admin_token;
    const session = req.session.admin_token;
    switch (cookie || session) {
      case cookie:
        console.log(cookie)
        const decodeCookie = jwt.verify(cookie, SECRET_KEY);
        if (decodeCookie) {
          req.session.destroy()
          next()
        } else {
          res.status(401).json({
            message: "unauthorized",
          });
        }
        break;
      case session:
        console.log(session)
        let decodeSession = jwt.verify(session, SECRET_KEY);
        if (decodeSession) {
          req.session.destroy()
          next()
        } else {
          res.status(401).json({
            message: "unauthorized",
          });
        }
      default:
        res.status(401).json({
          message: "unauthorized",
        });
    }
  } catch (e) {
    return e;
  }
}

module.exports = {
  authenticate,
  ensureAdmin,
  ensureAdminPost,
  logout,
};
