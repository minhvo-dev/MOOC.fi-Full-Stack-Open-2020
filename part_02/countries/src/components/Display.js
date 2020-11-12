import React from "react";
import Country from "./Country";

const Display = ({ countries, showOnClick }) => {
  if (countries.length > 10) { // more than 10 countries
    return (
      <div>Too many matches, specify another filter</div>
    );
  }
  else if (countries.length === 1) { // only 1 country
    return (
      <Country country={countries[0]} />
    );
  }
  // between 2 and 9 countries
  return (
    <div>{countries.map(
      country =>
        <div key={country.name}>
          {country.name}
          <button onClick={() => { showOnClick([country]) }}>
            show
            </button>
        </div>
    )}
    </div>
  );
}

export default Display;