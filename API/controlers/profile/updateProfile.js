const {
  modelUpdateProfile
} = require("../../models/modelProfile/modelUpdateProfile");

// UPDATE INFOS  FROM PROFILE PAGE
exports.updateProfile = async (req, res) => {
  try {
    // fillFilelist(req.body.values);
    console.log("req BEFORE UPDATE PROFILE", req.body.values);
    const data = await modelUpdateProfile(req);
    // PARSER LE FILELIST
    console.log("model AFTER UPDATING", data);
    let pics = [];
    data.fileList.map(async pic => await pics.push(JSON.parse(pic)));
    console.log("pics are", pics);
    data.fileList = pics;
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err);
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
