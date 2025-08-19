import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiUrl, geoApiOptions } from "../../Api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(`${geoApiUrl}/cities?namePrefix=${inputValue}`, geoApiOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`, //if u check the api call made that contains two param i.e latitude and longitude. so that why we need to give them as in a value.
              label: `${city.name} ${city.countryCode}`, // and all these names latitude longitude name and countryCode have been taken by running with any city and then inspect there besides console there is a network tab and in that we can see all params and variables by clickinf on the request made.
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData); //why??
  };
  return (
    <AsyncPaginate // it is very useful react component that combines react-select for nice dropdown ui, async data loading basically fetch options dynamically as user types and pagination i.e fetches the next page of results when needed.
      placeholder="Search for city"
      debounceTimeout={600} //so debounceTimeout prevents user to give successive inputs like clicking too fast or calling multiple apis. basically user ka koi bhi action before 600ms will be ignored and if user manlo clicks again at 50ms then it will be ignored and the debounce counter restarts from 0. so user has to wait a minimum of 100ms at one go without triggering any action.
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
export default Search;
