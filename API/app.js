const express = require("express");
const app = express();
const server = require("http").Server(app);
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const cookieParser = require("cookie-parser");
const cors = require("cors");
const formData = require("express-form-data");
global.io = require("socket.io")(server);
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// SERVER LISTENS
server.listen(9000, () => console.log("listening on 9000"));

//MIDDLEWARE
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(formData.parse());

// DIRIGE VERS LE ROUTER CENTRAL
const router = require("./router");
app.use("/", router);
// app.get("/api/Oauth/42");

// SOCKET MANAGEMENT FOR RT CHAT
// how to organise your sockets files // https://stackoverflow.com/questions/23653617/socket-io-listen-events-in-separate-files-in-node-js
const connectionEmit = require("./Sockets/connectedUsers");
const connectedUsrs = {};

io.sockets.on("connect", socket => {
  const disconnectUser = _ => {
    if (connectedUsrs[socket.id]) delete connectedUsrs[socket.id];
    connectionEmit(io, connectedUsrs);
  };

  connectedUsrs[socket.id] = socket.handshake.query;
  require("./Sockets/onJoinRoom")(socket);
  require("./Sockets/onChatMessage")(socket, io);
  require("./Sockets/newNotif").newNotifListener(socket, io);
  connectionEmit(io, connectedUsrs);
  socket.on("logOut", disconnectUser).on("disconnect", disconnectUser);
});

//OAUTH MANAGEMENT
const FortyTwoStrategy = require("passport-42").Strategy;
const passport = require("passport");
const modelCreateUser = require("./models/modelUser/modelCreateUser");
const modelFindOne = require("./models/modelUser/modelFindOne");
const cleanUserData = require("./controlers/user/cleanUserData");
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
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT USE
app.get("/api/Oauth/42", passport.authenticate("42"));
app.get("/api/Oauth/42/failure", (req, res) =>
  res.redirect("http://localhost:3000")
);
app.get(
  "/api/Oauth/42/redirect",
  passport.authenticate("42", { failureRedirect: "/api/Oauth/42/failure" }),
  async (req, res) => {
    // CREER UN COMPTE EN BACK
    const { emails, id, username } = req.user;
    const { first_name, last_name, image_url } = req.user._json;
    const result = await modelFindOne(parseInt(id), "IdDuoQuadra");

    if (result.length !== 0) {
      //ON REPREND LES INFOS SI ON A TROUVE UN USER
      const newUser = cleanUserData(result[0]._fields[0].properties);
      res.redirect(
        `http://localhost:3000/Oauth?jwt=${newUser.jwt}&uuid=${newUser.uuid}`
      );
    } else {
      try {
        //CREATE A NEW 42 USER
        const newUser = {
          body: {
            login: username,
            password: "",
            email: emails[0].value,
            firstName: first_name,
            lastName: last_name
          }
        };
        newUser.body.uuid = await uuid();
        await modelCreateUser(newUser, res);

        // ON AJOUTE DES CHAMPS DISPONIBLES ET ON REFORMATE
        modelFindOne(
          `${newUser.body.uuid}`,
          "uuid",
          `SET u.IdDuoQuadra=${id},
            u.lastName= '${last_name}',
            u.pics = ['${image_url}']`
        );
        newUser.body.jwt = await cleanUserData(newUser.body).jwt;

        // ON RENVOIE A UNE PAGE FRONT
        // console.log("created the 42 user", newUser.body);
        res.redirect(
          `http://localhost:3000/Oauth?jwt=${newUser.body.jwt}&uuid=${newUser.body.uuid}`
        );
      } catch (err) {
        console.log("error creating / finding 42 profile", err);
        res.redirect(`http://localhost:3000`);
      }
    }
  }
);
