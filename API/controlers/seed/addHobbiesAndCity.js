const fetch = require("node-fetch");
const hobby = require("../../public/includes/hobbies");
require("dotenv").config();

async function addHobbies(json) {
  try {
    let hobbiesExample = hobby.hobbiesExample();

    json.results.forEach(async (element, index) => {
      let hobbyUser = [];
      for (let y = 0; y < 6; y++) {
        hobbyUser.push(
          hobbiesExample[Math.floor(Math.random() * (49 - 0 + 1))]
        );
      }
      element.hobbies = [...new Set(hobbyUser)];
      element.index = index;
    });
    return json;
  } catch (error) {
    console.log("error in addhobbies and city", error);
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

      element.location.city =
        element.location.city.charAt(0).toUpperCase() +
        element.location.city.slice(1);

      let fakeBio = await fetch(
        "http://loremricksum.com/api/?paragraphs=3&quotes=1"
      );
      let fakeBio_json = await fakeBio.json();
      element.bio = fakeBio_json.data;
    }
    return json;
  } catch (err) {
    console.log("err is", err);
  }
}

const url = "https://randomuser.me/api/?results=10&nat=FR";
async function addTagNCity(req, res) {
  const response = await fetch(url);
  const json = await response.json();

  const usersWithHobbies = await addHobbies(json);
  const usersWithCoord = await addCityCoords(usersWithHobbies); // AMODIFIER POUR UNSPLASH
  res.send(usersWithCoord);
}

module.exports = {
  addTagNCity
};
