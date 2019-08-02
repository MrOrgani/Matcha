const {
  modelUpdateProfile
} = require("../../models/modelProfile/modelUpdateProfile");

// UPDATE INFOS  FROM PROFILE PAGE
exports.updateProfile = async (req, res) => {
  try {
    fillFilelist(req.body.values);
    console.log("req", req.body.values);
    // const data = await modelUpdateProfile(req.body.values);
    console.log("model", data);
    // res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const fillFilelist = data => {
  // data.fileList = [];
  data.pics.map((pic, i) =>
    data.fileList.push({
      uuid: i,
      name: pic,
      status: "done",
      url: pic
    })
  );
};
