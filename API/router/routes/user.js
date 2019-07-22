const router = require("express").Router();
const fetch = require("node-fetch");
const hobby = require("../../public/includes/hobbies");
const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());

const {
  createUser,
  loginUser,
  gUsers,
  delUsers,
  getUsers,
  updateProfile
} = require("../../controlers/User");

router.route("/").post((req, res) => {
  updateProfile(req, res);
});

router
  .route("/register")
  .post((req, res) => {
    createUser(req, res);
  })
  .get((req, res) => {
    getUsers(req, res);
  });

router.route("/login").post((req, res) => {
  loginUser(req, res);
});

router
  .route("/generate")
  .post((req, res) => {
    req.body.value ? gUsers(req, res) : delUsers(req, res);
  })
  .get(async (req, res) => {
    const url = "https://randomuser.me/api/?results=10&nat=FR";
    try {
      const response = await fetch(url);
      const json = await response.json();

      let hobbiesExample = hobby.hobbiesExample();

      json.results.forEach((element, index) => {
        let hobbyUser = [];
        for (let y = 0; y < 6; y++) {
          hobbyUser.push(
            hobbiesExample[Math.floor(Math.random() * (49 - 0 + 1))]
          );
        }
        element.hobbies = hobbyUser;
        element.index = index;
      });
      res.send(json);
    } catch (error) {
      console.log(error);
    }
  });

app.post("/image", (req, res) => {
  console.log("req", req);

  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  // file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).send(err);
  //   }
  //   res.json({ fileName: file.name, filePath: `/upload/${file.anem}` });
  // });
});

module.exports = router;
