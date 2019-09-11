const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

//scoreChange : +2 Visit, +5 like, -20 block, -5 unlike
//ScoreChange is done in each model
exports.modelChangeScore = async (req, scoreChange) => {
  // console.log("in model change Score", req, scoreChange);
  try {
    await session.run(
      `MATCH (s:User {uuid:{target}})
        SET s.score = s.score + ${scoreChange}`,
      req
    );
  } catch (err) {
    console.log("modelChangeScore", err, req);
  }
};
