const getMimetype = signature => {
  switch (signature) {
    case "89504E47":
      return "image/png";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
      return "image/jpeg";
  }
};

module.exports = async function fileValidation(req, res, next) {
  let errors = {};
  const { pics } = req.body.values;
  for (let x in pics) {
    const pic = await JSON.parse(pics[x]);
    const readerProof = new FileReader();

    readerProof.onloadend = function(evt) {
      const uint = new Uint8Array(evt.target.result); //turns the 4 letter string into an array of unsigned int
      let bytes = []; // take every byte and turn it into hex
      uint.forEach(byte => {
        bytes.push(byte.toString(16));
      });
      const hex = bytes.join("").toUpperCase();
      if (getMimetype(hex).slice(0, 5) !== "image") {
        errors.pics = "Pictures must be of type ong or jpeg";
        return;
      }
    };
    await readerProof.readAsArrayBuffer(pic);

    //if the picture is secure, put it in the db as an url
    if (!errors.pics) {
      reader = new FileReader();
      reader.readAsDataUrl(pic);
      reader.onloadend = function() {
        req.body.values.pics[x] = pic;
      };
    }
  }

  for (let x in errors) return res.status(201).send(errors);
  next();
};
