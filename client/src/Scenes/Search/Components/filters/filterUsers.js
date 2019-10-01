import React, { useContext, useState, useEffect } from "react";
// import "./UserList.css";
import { AuthContext } from "../../../../AuthContext";
const distFrom = require("distance-from");

export default async (filters, users, setLoading, setFilteredUserList) => {
  const [, authContext] = useContext(AuthContext);
  const { gender, age, pop, dist, sort, ord, tags } = filters;

  await (() => {
    const genderFiltered =
      !gender || gender === "both"
        ? users
        : users.filter(user => user.gender === gender);

    let filtersfiltered = genderFiltered
      .filter(user => user.age >= age[0] && user.age <= age[1])
      .filter(user => user.score >= pop[0] && user.score <= pop[1])
      .filter(
        user =>
          distFrom(authContext.data.location).to(user.location).distance.v <=
          dist
      );

    if (tags.length > 0) {
      filtersfiltered = filtersfiltered.filter(elem =>
        tags.every(tag => elem.hobbies.includes(tag))
      );
    }
    if (sort) {
      if (sort === "age")
        return filtersfiltered.sort((a, b) =>
          ord
            ? parseFloat(a.age) - parseFloat(b.age)
            : parseFloat(b.age) - parseFloat(a.age)
        );
      else if (sort === "pop")
        return filtersfiltered.sort((a, b) =>
          ord
            ? parseFloat(a.score) - parseFloat(b.score)
            : parseFloat(b.score) - parseFloat(a.score)
        );
      else if (sort === "dist") {
        return filtersfiltered.sort((a, b) =>
          ord
            ? parseFloat(
                distFrom(authContext.data.location).to(a.location).distance.v
              ) -
              parseFloat(
                distFrom(authContext.data.location).to(b.location).distance.v
              )
            : parseFloat(
                distFrom(authContext.data.location).to(b.location).distance.v
              ) -
              parseFloat(
                distFrom(authContext.data.location).to(a.location).distance.v
              )
        );
      }
    } else return filtersfiltered;
  })();

  //   filteredUserList.length > 0 && setLoading(false);
};
