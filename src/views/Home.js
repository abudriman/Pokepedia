import React from "react";
import ListItem from "../components/ListItem";
import { useQuery, gql } from "@apollo/client";

const Q_POKEMON_LIST = gql`
  query {
    pokemons(limit: 20, offset: 0) {
      count
      next
      previous
      status
      message
      results {
        id
        image
        name
        url
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(Q_POKEMON_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const listItems = data.pokemons.results.map((pokemon) => (
    <ListItem key={pokemon.id.toString()} item={pokemon}></ListItem>
  ));

  return (
    <div>
      <p>Home Page</p>
      <ul>{listItems}</ul>
    </div>
  );
}

export default Home;
