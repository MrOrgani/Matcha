const url = "https://randomuser.me/api/?results=1&nat=FR";
const fetch = require("node-fetch");
const hobby = require("../../public/includes/hobbies");

async function addHobbies(json) {
  try {
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
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function addCityCoords(json) {
  try {
    for (let element of json.results) {
      const cityQuery = encodeURI(
        'http://nominatim.openstreetmap.org/search?city="' +
          element.location.city +
          '"&limit=1&countrycodes=fr&format=json'
      );
      const locat = await fetch(cityQuery);

      const locat_json = await locat.json();
      element.coords = [locat_json[0].lat, locat_json[0].lon];
    }
    return json;
  } catch (err) {
    console.log("err is", err);
  }
}

async function addTagNCity(req, res) {
  const response = await fetch(url);
  const json = await response.json();

  const usersWithHobbies = await addHobbies(json);
  const usersWithCoord = await addCityCoords(usersWithHobbies);
  res.send(usersWithCoord);
}

module.exports = {
  addTagNCity
};
