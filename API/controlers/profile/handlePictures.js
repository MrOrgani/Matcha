const {
  modelUpdateProfileImage
} = require("../../models/modelProfile/modelUpdateProfileImage");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

async function addPicture(req, res) {
  try {
    console.log(req.files);
    console.log("query", req.query);
    const values = Object.values(req.files);
    const promises = values.map(image =>
      cloudinary.uploader.upload(image.path)
    );
    console.log("promises", promises);
    Promise.all(promises)
      .then(results => {
        console.log("results", results);
        req.body.arrayURL = [];
        results.map(result => req.body.arrayURL.push(result.secure_url));
        modelUpdateProfileImage(req, res);
      })
      .catch(err => console.log("err", err));
    res.status(200);
  } catch (err) {
    res.status(406).send(err);
  }
}

module.exports = {
  addPicture
};
