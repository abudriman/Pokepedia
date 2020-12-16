import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import User from "./views/User";
import MenuBar from "./components/core/MenuBar";
import Pokemon from "./views/Pokemon";
import { openDB } from "idb";
import { OwnedProvider } from "./components/context/Owned";

const Q_POKEMON_LIST = gql`
  query {
    pokemons(limit: 1118, offset: 0) {
      # 1118
      count
      results {
        id
        image
        name
      }
    }
  }
`;

function createIdb() {
  openDB("pokepedia", 1, {
    upgrade(db) {
      db.createObjectStore("user");
      db.createObjectStore("pokemon");
    },
  });
}
const MainRouter = () => {
  createIdb();
  const [owned, setOwned] = useState([]);
  const { loading, error, data } = useQuery(Q_POKEMON_LIST);

  useEffect(() => {
    const getOwnedPokemon = async () => {
      const db1 = await openDB("pokepedia", 1);
      db1
        .getAll("pokemon")
        .then((data) =>
          data.map((row) => setOwned((owned) => [...owned, JSON.parse(row)]))
        );
      db1.close();
    };
    getOwnedPokemon();
  }, []);

  return (
    <div>
      <MenuBar></MenuBar>
      <OwnedProvider value={{ owned, setOwned }}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home {...props} data={data} loading={loading} error={error} />
            )}
          />
          <Route exact path="/pokemon/:pokemonName" component={Pokemon} />
          <Route path="/user" component={User} />
        </Switch>
      </OwnedProvider>
    </div>
  );
};
export default MainRouter;
