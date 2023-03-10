"use strict";
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
    const cookie = req.headers.authorization;
    const session = req.session.admin_token;
    
    if (!cookie && !session) {
      res.status(401).json({
        message: "unauthorized"
      });
    }
    switch (cookie || session) {
      case cookie:
        let decodeCookie = jwt.verify(cookie, SECRET_KEY);
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
  } catch (e) {
    return e;
  }
}

function ensureAdminPost(req, res, next) {
  const cookie = req.body.Authorization 
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
    const cookie = req.headers.authorization;
    const session = req.session.admin_token;
    if (!cookie && !session) {
      res.status(401).json({
        message: "unauthorized",
      });
    }
    switch (cookie || session) {
      case cookie:
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
        let decodeSession = jwt.verify(session, SECRET_KEY);
        if (decodeSession) {
          req.session.destroy()
          next()
        } else {
          res.status(401).json({
            message: "unauthorized",
          });
        }
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
