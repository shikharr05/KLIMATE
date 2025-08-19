import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiUrl, geoApiOptions } from "../../Api";



//styles

const SELECT_STYLES = {
  control: (base, state) => ({
    ...base,
    borderRadius: 999,
    paddingLeft: 6,
    minHeight: 48,
    borderColor: state.isFocused ? "#1de9b6" : "#e3e3e3",
    boxShadow: state.isFocused
      ? "0 0 0 4px rgba(29,233,182,.15)"
      : "0 6px 18px rgba(0,0,0,.08)",
    ":hover": { borderColor: "#1de9b6" },
    backgroundColor: "#fff",
  }),
  valueContainer: (b) => ({ ...b, padding: "0 10px" }),
  input: (b) => ({ ...b, margin: 0 }),
  singleValue: (b) => ({ ...b, fontWeight: 600 }),
  placeholder: (b) => ({ ...b, color: "#6b7280" }),
  indicatorsContainer: (b) => ({ ...b, gap: 4 }),
  dropdownIndicator: (b, s) => ({
    ...b,
    color: s.isFocused ? "#10b981" : "#6b7280",
    ":hover": { color: "#10b981" },
  }),
  clearIndicator: (b) => ({
    ...b,
    color: "#9ca3af",
    ":hover": { color: "#ef4444" },
  }),
  menu: (b) => ({
    ...b,
    borderRadius: 16,
    marginTop: 8,
    boxShadow: "0 16px 40px rgba(0,0,0,.15)",
    overflow: "hidden",
  }),
  menuList: (b) => ({ ...b, padding: 8 }),
  option: (b, state) => ({
    ...b,
    borderRadius: 10,
    padding: "10px 12px",
    fontWeight: 500,
    backgroundColor: state.isSelected
      ? "rgba(16,185,129,.12)"
      : state.isFocused
      ? "rgba(0,194,255,.08)"
      : "#fff",
    color: "#111827",
    cursor: "pointer",
  }),
};

//dont be afraid just styles from gpt
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
      styles={SELECT_STYLES}
    />
  );
};
export default Search;
