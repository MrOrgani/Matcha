// const { modelGetNotif } = require("../../models/modelTempChat/modelGetNotif");

// exports.getNotif = async (req, res) => {
//   const notifArray = [];
//   // console.log(req);
//   try {
//     const result = await modelGetNotif(req.query);
//     // console.log("result in controller", result);
//     result.forEach(elem => {
//       // console.log(elem);
//       let formattedElem = JSON.parse(elem);
//       notifArray.push(formattedElem);
//       // console.log(messageArray);
//     });
//     // console.log("in controler GetMessages, result: ", messageArray);
//     res.status(200).send(notifArray);
//   } catch (err) {
//     res.status(206).send(err);
//   }
// };
