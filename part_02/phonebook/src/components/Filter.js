import React from "react";

const Filter = ({ filter, onChange }) => (
  <form>
    <div>filter shown with <input value={filter} onChange={onChange} /></div>
  </form>
);

export default Filter;