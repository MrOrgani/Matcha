const modelUser = require("../models/modelUser");
const Validation = require("./Validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");
// const express = require("express");
// const app = express();
// const isConnectedToChat = require("../app");
const { modelUserVerif } = require("../models/modelUserVerif");
const { modelFindOne, modelCreateUser } = require("./../models/modelUser");

async function createUser(req, res) {
  try {
    req.body.uuid = await uuid();
    const data = await modelCreateUser(req.body);
    res.status(200).send(data);
  } catch (err) {
    res.status(206).send(err);
  }
}

async function loginUser(req, res) {
  // console.log(req);
  try {
    let userData = await modelFindOne(req.body.login, "login");
    if (userData.length === 0) return res.status(401).send("Invalid username");
    userData = userData[0]._fields[0].properties;
    if (!(await bcrypt.compare(req.body.password, userData.password)))
      return res.status(206).send("Invalid password");
    userData = cleanUserData(userData);
    return res.status(200).send(userData);
  } catch (err) {
    console.log(err);
    return res.status(207).send(err);
  }
}

function cleanUserData(userData) {
  const token = jwt.sign(
    { uuid: userData.uuid, login: userData.login },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    }
  );
  userData.jwt = token;
  // delete userData.uuid;// need it for the chat rooms
  delete userData.password;
  return userData;
}

// Crypts pwd and returns a well rounded user object from req.body
async function cryptAndObjectify(req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

function gUsers(req, res) {
  modelUser.gUsers(req, res);
}

function delUsers(req, res) {
  modelUser.delUsers(req, res);
}

function getUsers(req, res) {
  modelUser.getUsers(req, res);
}

async function userVerif(req, res, next) {
  try {
    if (req.query) {
      modelUserVerif(req.query);
      return next();
    } else if (req.body.values) {
      modelUserVerif(req.body.values);
      return next();
    } else if (req.body) {
      modelUserVerif(req.body);
      return next();
    }
    res.status(401).send(err);
  } catch (err) {
    res.status(401).send(err);
  }
}

async function loginOrEmailNotTaken(req, res, next) {
  try {
    let data = await modelFindOne(req.body.login, "login");
    if (data.length > 0) res.status(400).send("Login already taken.");
    else {
      data = await modelFindOne(req.body.email, "email");
      if (data.length > 0) res.status(400).send("Login already taken.");
      else next();
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function findOne(req, res) {
  try {
    // console.log(req.query);
    let data = await modelFindOne(req.query.uuidSource, "uuid");
    delete data.password;
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(206).send(err);
  }
}

module.exports = {
  createUser,
  loginUser,
  gUsers,
  delUsers,
  getUsers,
  userVerif,
  loginOrEmailNotTaken,
  cryptAndObjectify,
  findOne
  // updateProfile
};
