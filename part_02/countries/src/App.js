import React, { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  const searchOnChange = (event) => {
    let matches = countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setCountriesToShow(matches);
    setSearchStr(event.target.value);
  }

  return (
    <div>
      <div>find countries <input value={searchStr} onChange={searchOnChange} /></div>
      <Display countries={countriesToShow} showOnClick={setCountriesToShow} />
    </div>
  );
}

export default App;