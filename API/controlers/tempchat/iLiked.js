const { modelILiked } = require("../../models/modelTempChat/modelILiked");

exports.iLiked = async (req, res) => {
  try {
    const result = await modelILiked(req.query);
    let iLiked = [];
    if (result.length > 0) {
      result.map(item => iLiked.push(item._fields[0].properties));
    }
    res.status(200).send(iLiked);
  } catch (err) {
    res.status(206).send(err);
  }
};
