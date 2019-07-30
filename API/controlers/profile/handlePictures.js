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
    console.log("in here", req.body);
    const values = Object.values(req.body);
    console.log("values", values);
    const promises = await values.map(image =>
      cloudinary.uploader.upload(image.path)
    );

    await Promise.all(promises)
      .then(results => console.log(results))
      .catch(err => res.status(400).json(err));
  } catch (err) {
    res.status(401).send(err);
  }
}

// app.post("/image-upload", (req, res) => {

// });

module.exports = {
  addPicture
};
