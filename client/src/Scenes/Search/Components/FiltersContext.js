import React, { useState, createContext } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = props => {
  const [filters, setFilters] = useState([
    {
      age: [18,100]
    },
    {
      gender: 'both'
    }
  ]);

  return (
    <FiltersContext.Provider value={[filters, setFilters]}>
      {props.children}
    </FiltersContext.Provider>
  );
};
