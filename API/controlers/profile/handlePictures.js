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
  console.log("in here");
  const values = Object.values(req.files);
  console.log("values", values);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise.all(promises)
    .then(results => res.json(results[0].secure_url))
    .catch(err => res.status(400).json(err));
}

// app.post("/image-upload", (req, res) => {

// });

module.exports = {
  addPicture
};
