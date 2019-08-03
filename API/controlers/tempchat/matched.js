const {modelIMatched} = require('../../models/modelTempChat/modelIMatched')

async function iMatched(req, res) {
    try {
        const result = await modelIMatched(req.query)
        res.status(200).send(result);
    } catch (err) {
      res.status(206).send(err);
    }
}

module.exports = {
    iMatched
}