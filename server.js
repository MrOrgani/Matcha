const express = require("express");
const randomProfile = require("random-profile-generator");
var cors = require("cors");

let profile = "";

// for (let i = 0; i < 50; i++) {
//   profile.push(randomProfile.profile());
// }

// let text = "";
// for (let i = 0; i < 50; i++) {
//   profile = randomProfile.profile();
//   //   console.log(profile);
//   text += `CREATE (${profile["firstName"]}${
//     profile["lastName"]
//   }:Person {firstName: '${profile["firstName"]}', lastName: '${
//     profile["lastName"]
//   }', gender: '${profile["gender"]}', born: '${profile["birthday"].substr(
//     -4
//   )}', age: '${profile["age"]}', avatar: '${profile["avatar"]}', address: '${
//     profile["address"]
//   }', zip: '${profile["zip"]}', state: '${profile["state"]}', phone: '${
//     profile["phone"]
//   }', email: '${profile["email"]}'})\n`;
// }

// console.log(text);

const app = express();

app.use(cors());

app.get("https://randomuser.me/api/?results=500", (req, res) => {
  //   const customers = profile;
  res.json(text);
});

const port = 5000;

app.listen(port, () => console.log(`Connect on port ${port}`));
