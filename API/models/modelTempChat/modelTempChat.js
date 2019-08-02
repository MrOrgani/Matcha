const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

exports.modelTempChat = async (s = '', r, d, t = '', w) {
    let cypher = `MATCH (s:User `
}