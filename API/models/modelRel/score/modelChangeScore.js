const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

//scoreChange : +2 Visit, +5 like, -20 block, -5 unlike
//ScoreChange is done in each model
exports.modelChangeScore = async (req, scoreChange) => {
  // console.log(req);
  try {
    const data = await session.run(
      `MATCH (s:User {uuid:{uuidSource}})
        SET s.score = s.score + ${scoreChange}`,
      req
    );
    return data;
  } catch (err) {
    console.log("modelChangeScore", err, req);
  }
};
