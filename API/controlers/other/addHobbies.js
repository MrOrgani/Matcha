const url = "https://randomuser.me/api/?results=10&nat=FR";
const fetch = require("node-fetch");
const hobby = require("../../public/includes/hobbies");

async function addHobbies(req, res) {
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
}

module.exports = {
  addHobbies
};
