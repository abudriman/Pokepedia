import React from "react";
import { useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

const Q_POKEMON_LIST = gql`
  query Pokemon($pokemonName: String!) {
    pokemon(name: $pokemonName) {
      types {
        slot
        type {
          url
          name
        }
      }
    }
  }
`;

function Pokemon() {
  let { pokemonName } = useParams();
  const { loading, error, data } = useQuery(Q_POKEMON_LIST, {
    variables: { pokemonName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <p>Pokemon's Detail Page</p>
    </div>
  );
}

export default Pokemon;
