const {modelILiked} = require('../../models/modelTempChat/modelILiked')

async function iLiked(req, res) {
    try {
        // console.log('req query', req.query)
        const result = await modelILiked(req.query)
        res.status(200).send(result);
    } catch (err) {
      res.status(206).send(err);
    }
}

module.exports = {
    iLiked
}
