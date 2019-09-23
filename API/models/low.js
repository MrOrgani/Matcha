module.exports = function low(arr) {
  if (arr.records) {
    const { properties } = arr.records[0]._fields[0];
    console.log("low, before operations", properties);
    properties.age =
      typeof properties.age === "number" ? properties.age : properties.age.low;
    properties.indexOfPP =
      typeof properties.indexOfPP === "number"
        ? properties.indexOfPP
        : properties.indexOfPP.low;
    properties.score =
      typeof properties.score === "number"
        ? properties.score
        : properties.score.low;
    if (properties.idDuoQuadra)
      properties.idDuoQuadra = properties.idDuoQuadra.low;
    console.log("low after operations", properties);
    return properties;
  } else {
    console.log("in low.js", arr);
    arr.age = arr.age ? arr.age : arr.age.low;
    arr.indexOfPP = arr.indexOfPP ? arr.indexOfPP : arr.indexOfPP.low;
    arr.score = arr.score ? arr.score : arr.score.low;
    return arr;
  }
};
