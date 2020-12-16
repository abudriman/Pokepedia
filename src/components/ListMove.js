import React from "react";

function ListMove({ item }) {
  return (
    <div>
      <li>{item.move.name}</li>
    </div>
  );
}

export default ListMove;
