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
    console.log("body", req.files);
    console.log("query", req.query);
    const values = Object.values(req.files);
    const promises = values.map(image =>
      cloudinary.uploader.upload(image.path)
    );
    // console.log("promises", promises);
    const results = await Promise.all(promises).catch(err =>
      console.log("err", err)
    );
    //   // .then(results => {
    console.log("results of promises", results);
    req.body.fileList = [];
    results.map((result, i) =>
      req.body.fileList.push(
        JSON.stringify({
          uid: i,
          name: result.secure_url,
          status: "done",
          url: result.secure_url
        })
      )
    );
    const newDataPics = await modelUpdateProfileImage(req);
    console.log("newDataPics 2.0", newDataPics);

    res.status(201).send(newDataPics);
  } catch (err) {
    res.status(406).send(err);
  }
}

module.exports = {
  addPicture
};
