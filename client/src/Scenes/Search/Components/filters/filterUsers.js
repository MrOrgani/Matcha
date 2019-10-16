const distFrom = require("distance-from");

export async function filterUsers(filters, users, authLocation) {
  const { gender, age, pop, dist, tags } = filters;
  if (users.length === 0) return [];
  const genderFiltered =
    !gender || gender === "both"
      ? users
      : users.filter(user => user.gender === gender);
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
// --> donc si on veut trier en ordre decroissant on veut que b soit superieur a a

export function sortMatchUsers(filteredUsers, authLocation) {
  let test = filteredUsers.sort(
    (a, b) =>
      b.score * 0.1 +
      b.similarityScore * 3 +
      10 / distFrom(authLocation).to(b.location).distance.v -
      (a.score * 0.1 +
        a.similarityScore * 3 +
        10 / distFrom(authLocation).to(a.location).distance.v)
  );
  return test;
}
