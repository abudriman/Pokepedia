import React from "react";

function ListType({ slot }) {
  return (
    <div>
      <li>{slot.type.name}</li>
    </div>
  );
}

export default ListType;
