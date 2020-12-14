import React from "react";
import { Link } from "react-router-dom";

function ListItem({ item }) {
  return (
    <li>
      <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
    </li>
  );
}

export default ListItem;
