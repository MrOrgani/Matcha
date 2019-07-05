import React, { useState, createContext } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = props => {
  const [filters, setFilters] = useState(props.value);
  console.log("Filters Context", filters);
  //   console.log(filters);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await axios("http://localhost:9000/api/user");
  //       setUsers(result.data.records);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <FiltersContext.Provider value={[filters, setFilters]}>
      {props.children}
    </FiltersContext.Provider>
  );
};
