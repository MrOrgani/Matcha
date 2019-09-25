module.exports = function low(arr) {
  arr.age = typeof arr.age === "number" ? arr.age : arr.age.low;
  arr.indexOfPP =
    typeof arr.indexOfPP === "number" ? arr.indexOfPP : arr.indexOfPP.low;
  arr.score = typeof arr.score === "number" ? arr.score : arr.score.low;
  if (arr.IdDuoQuadra) arr.IdDuoQuadra = arr.IdDuoQuadra.low;
  return arr;
};
