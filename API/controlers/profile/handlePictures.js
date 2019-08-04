const {
  modelUpdateProfile
} = require("../../models/modelProfile/modelUpdateProfile");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

async function addPicture(req, res) {
  try {

    // const files = Array.from(values.fileList);
    // const formData = new FormData();
    // files.forEach((file, i) => {
    //   formData.append(i, file.originFileObj);
    // });
    // console.log('req', req.body, 'req values', req.values)
    console.log('body',req.files);
    console.log("query", req.query);
    const values = Object.values(req.files);
    const promises = values.map(image =>
      cloudinary.uploader.upload(image.path)
    );
    // console.log("promises", promises);
    const results = await Promise.all(promises)
    .catch(err => console.log("err", err));
    //   // .then(results => {
    console.log("results of promises", results);
        req.body.fileList = [];
        results.map(result => req.body.fileList.push(result.secure_url));
    //    const newData = await modelUpdateProfile(req.body);
    //    console.log('new data', newData)
    //   // })
    // res.status(200),send(newData);
  } catch (err) {
    res.status(406).send(err);
  }
}

module.exports = {
  addPicture
};
