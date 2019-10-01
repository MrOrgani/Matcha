const distFrom = require("distance-from");

export async function filterUsers(filters, users, authLocation) {
  const { gender, age, pop, dist, tags } = filters;
  // console.log("filterUsers", gender, age, users);
  if (users.length === 0) return [];
  const genderFiltered =
    !gender || gender === "both"
      ? users
      : users.filter(user => user.gender === gender);
  // console.log("first filter, genderFiltered", age);
  let filteredUsers = await genderFiltered
    .filter(user => user.age >= age[0] && user.age <= age[1])
    .filter(user => user.score >= pop[0] && user.score <= pop[1])
    .filter(
      user => distFrom(authLocation).to(user.location).distance.v <= dist
    );

  if (tags && tags.length > 0) {
    filteredUsers = await filteredUsers.filter(elem =>
      tags.every(tag => elem.hobbies.includes(tag))
    );
  }
  return filteredUsers;
}

export async function sortUsers(filteredUsers, filters, authLocation) {
  const { sort, ord } = filters;
  if (sort !== "") {
    if (sort === "age")
      return await filteredUsers.sort((a, b) =>
        ord
          ? parseFloat(a.age) - parseFloat(b.age)
          : parseFloat(b.age) - parseFloat(a.age)
      );
    else if (sort === "pop")
      return await filteredUsers.sort((a, b) =>
        ord
          ? parseFloat(a.score) - parseFloat(b.score)
          : parseFloat(b.score) - parseFloat(a.score)
      );
    else if (sort === "dist") {
      return await filteredUsers.sort((a, b) =>
        ord
          ? parseFloat(distFrom(authLocation).to(a.location).distance.v) -
            parseFloat(distFrom(authLocation).to(b.location).distance.v)
          : parseFloat(distFrom(authLocation).to(b.location).distance.v) -
            parseFloat(distFrom(authLocation).to(a.location).distance.v)
      );
    }
  } else return filteredUsers;
}
//Si fonctionComparaison(a, b) est inférieur à 0,
//on trie a avec un indice inférieur à b (a sera classé avant b)
export function sortMatchUsers(filteredUsers, authLocation) {
  // console.log(filteredUsers, authLocation);
  // filteredUsers[0] &&
  //   // console.log(
  //   filteredUsers[0].similarityScore,
  //   filteredUsers[0].score,
  //   distFrom(authLocation).to(filteredUsers[0].location).distance.v
  // );
  return filteredUsers.sort(
    (a, b) =>
      b.score * 0.2 +
      b.similarityScore * 0 +
      distFrom(authLocation).to(b.location).distance.v -
      (a.score * 0.2 +
        a.similarityScore * 0 +
        distFrom(authLocation).to(a.location).distance.v)
  );
}
