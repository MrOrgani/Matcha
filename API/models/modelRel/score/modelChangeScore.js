const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

//scoreChange : +2 Visit, +5 like, -20 block, -5 unlike
//ScoreChange is done in each model
exports.modelChangeScore = async (req, scoreChange) => {
  const cypher =
    scoreChange >= 0
      ? "MATCH (s:User {uuid:$target}) SET s.score = CASE WHEN s.score + $scoreChange > 100 THEN 100 ELSE s.score + $scoreChange END"
      : "MATCH (s:User {uuid:$target}) SET s.score = CASE WHEN s.score + $scoreChange < 0 THEN 0 ELSE s.score + $scoreChange END";
  try {
    await session.run(cypher, { target: req.target, scoreChange: scoreChange });
  } catch (err) {
    console.log("modelChangeScore", err, req);
  }
};
