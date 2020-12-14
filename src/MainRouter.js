import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import User from "./views/User";
import MenuBar from "./components/core/MenuBar";
import Pokemon from "./views/Pokemon";

const MainRouter = () => {
  return (
    <div>
      <MenuBar></MenuBar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokemon/:pokemonName" component={Pokemon} />
        <Route path="/user" component={User} />
      </Switch>
    </div>
  );
};
export default MainRouter;
