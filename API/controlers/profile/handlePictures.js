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
    const values = Object.values(req.files);
    const promises = values.map(image =>
      cloudinary.uploader.upload(image.path)
    );

    Promise.all(promises)
      .then(results => {
        req.body.arrayURL = [];
        results.map(result => req.body.arrayURL.push(result.secure_url));
        modelUpdateProfileImage(req);
      })
      .catch(err => console.log(err));
    res.status(204);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  addPicture
};
