import React from "react";

const Search = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      className="form-control my-3"
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={searchQuery}
      onChange={e => onSearchChange(e.currentTarget.value)}
    />
  );
};

export default Search;
