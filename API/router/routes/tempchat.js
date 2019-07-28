const router = require("express").Router();
const fetch = require("node-fetch");

const {iMatched} = require('../../controlers/tempchat/matched')
const {likesMe} = require('../../controlers/tempchat/likesMe')
const {iLiked} = require('../../controlers/tempchat/iLiked')
const {visitedMe} = require('../../controlers/tempchat/visitedMe')
const {iVisited} = require('../../controlers/tempchat/iVisited')
const {iBlocked} = require('../../controlers/tempchat/iBlocked')

router.route('/matched').get((req,res) => iMatched(req,res))
router.route("/likes").get((req,res)=> likesMe(req,res))
router.route("/liked").get((req,res)=> iLiked(req,res))
router.route("/visits").get((req,res)=> visitedMe(req,res))
router.route("/visited").get((req,res)=> iVisited(req,res))
router.route("/blocked").get((req,res)=> iBlocked(req,res))

module.exports = router