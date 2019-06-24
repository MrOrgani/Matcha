const express = require("express");
const hobby = require("./hobbies");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());

const url = "https://randomuser.me/api/?results=50&nat=FR";
const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    let hobbiesExample = hobby.hobbiesExample();

    json.results.forEach(element => {
      let hobbyUser = [];
      for (let y = 0; y < 6; y++) {
        hobbyUser.push(
          hobbiesExample[Math.floor(Math.random() * (50 - 0 + 1))]
        );
      }
      element.hobbies = hobbyUser;
    });

    app.get("/", (req, res) => {
      res.send(json);
    });
  } catch (error) {
    console.log(error);
  }
};
getData(url);

const port = 5000;
app.listen(port, () => console.log(`Connect on port ${port}`));
