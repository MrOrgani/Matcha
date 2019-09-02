const url = "https://randomuser.me/api/?results=10&nat=FR";
const fetch = require("node-fetch");
const hobby = require("../../public/includes/hobbies");
require("dotenv").config();

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

async function addImg(json) {
  try {
    for (let element of json.results) {
      // https://api.unsplash.com/photos/random/?client_id=3961c46062fb50998b300c64ab95f4470b1b4c7f79f23969fa55cc68bda7e109&query=girl
      const dataUnSplash = await fetch(
        `https://api.unsplash.com/photos/random/?client_id=${
          process.env.US_ACCKEY
        }&query=${element.gender === "male" ? "guy" : "girl"}`
      ).catch(err => console.log("err add img", err));
      const dataUS_json = await dataUnSplash.json();

      element.picture.large = dataUS_json.urls.regular;
      element.picture.medium = dataUS_json.urls.small;
      element.picture.thumbnail = dataUS_json.urls.thumb;
    }
    return json;
  } catch (err) {
    console.log("err is", err);
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
      console.log("elem", element);
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
  const usersWithImg = await addImg(usersWithHobbies);
  const usersWithCoord = await addCityCoords(usersWithImg);
  res.send(usersWithCoord);
}

module.exports = {
  addTagNCity
};
