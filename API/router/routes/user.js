const router = require("express").Router();
const fetch = require("node-fetch");
const hobby = require("../../public/includes/hobbies");

const {
  createUser,
  loginUser,
  gUsers,
  delUsers,
  getUsers
} = require("../../controlers/User");

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

module.exports = router;
