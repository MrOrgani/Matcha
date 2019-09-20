//OAUTH MANAGEMENT
const FortyTwoStrategy = require("passport-42").Strategy;
const passport = require("passport");
const modelCreateUser = require("../models/modelUser/modelCreateUser");
const modelFindOne = require("../models/modelUser/modelFindOne");
const cleanUserData = require("../controlers/user/cleanUserData");
const uuid = require("uuid/v4");

//PASSPORT SETUP
passport.use(
  new FortyTwoStrategy(
    {
      clientID:
        "df73b3fc5349efbfe57212d545fa735865396e52b4255c89e2302a385f0ab970",
      clientSecret:
        "879768eaf73a693d8feb1db647223d29be6555d3bd667ad6bf42d6adac9c3808",
      callbackURL: "http://localhost:9000/api/Oauth/42/redirect"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));
passport.inititialize();
passport.session();
