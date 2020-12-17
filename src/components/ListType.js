import React from "react";

/* @jsxImportSource @emotion/react */
// eslint-disable-next-line
import { jsx, css } from "@emotion/react";

const pokemonColorObj = {
  normal: "#A8A878",
  fighting: "#C13728",
  flying: "#A890F0",
  poison: "#A35AA0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A9B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#EF5D88",
  ice: "#98D8D8",
  dragon: "#7F82F8",
  dark: "#705848",
};

function ListType({ slot }) {
  const typeBackgroundColor = () => {
    return pokemonColorObj[slot.type.name];
  };

  return (
    <li
      css={css`
        background-color: ${typeBackgroundColor()};
        color: white;
        padding: 4px 5px;
        border-radius: 10px;
        margin-left: 2px;
        margin-right: 2px;
      `}
    >
      {slot.type.name}
    </li>
  );
}

export default ListType;
