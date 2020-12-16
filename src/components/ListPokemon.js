import React, { useContext } from "react";
import { Link } from "react-router-dom";
import OwnedContext from "../components/context/Owned";

const countOwned = (array, id) => {
  let count = 0;
  array.map((obj) => (obj["idPokemon"] === id ? (count += 1) : obj));
  return count;
};

function ListPokemon({ item }) {
  const { owned } = useContext(OwnedContext);
  return (
    <li>
      <img src={item.image} />
      <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
      {countOwned(owned, item.id)}
    </li>
  );
}

export default ListPokemon;
