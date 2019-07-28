const {modelLikesMe} = require('../../models/modelTempChat/modelLikesMe')

async function likesMe(req, res) {
    try {
        // console.log('req query', req.query)
        const result = await modelLikesMe(req.query)
        res.status(200).send(result);
    } catch (err) {
      res.status(206).send(err);
    }
}

module.exports = {
    likesMe
}
