import React from "react";

const PersonForm = (props) => (
  <form>
    <div>
      name: <input value={props.name} onChange={props.nameOnChange} />
    </div>
    <div>
      number: <input value={props.number} onChange={props.numberOnChange} />
    </div>
    <div>
      <button type="submit" onClick={props.addPerson}>add</button>
    </div>
  </form>
);

export default PersonForm;