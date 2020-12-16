import React, { useContext } from "react";
import OwnedContext from "../components/context/Owned";
import { openDB } from "idb";

function ListOwned() {
  const { owned, setOwned } = useContext(OwnedContext);

  const removePokemon = async (nickname) => {
    let confirm = window.confirm("are you sure?");
    if (confirm) {
      const db1 = await openDB("PokemonIDB", 1);
      db1
        .delete("storePokemon", nickname)
        .then((result) => {
          setOwned([...owned.filter((owned) => owned.nickname !== nickname)]);
        })
        .catch((err) => {
          alert("nickname sudah dipake, cari nama yang lain ya");
        });
    }
  };

  if (owned.length === 0) {
    return <p>You don't own any pokemon :(</p>;
  } else {
    return (
      <ul>
        {owned.map((row) => (
          <li key={row.nickname}>
            <img src={row.icon} />
            {row.pokemonName}-{row.nickname}
            <button
              onClick={() => {
                removePokemon(row.nickname);
              }}
            >
              release
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListOwned;
