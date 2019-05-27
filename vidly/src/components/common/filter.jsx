import React from "react";

const Filter = ({
  items,
  currentFilter,
  onFilterChange,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          style={{ cursor: "pointer" }}
          key={item[valueProperty]}
          className={
            item === currentFilter
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onFilterChange(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default Filter;
