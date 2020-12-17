import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
/* @jsxImportSource @emotion/react */
// eslint-disable-next-line
import { jsx, Global, css } from "@emotion/react";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Global
        styles={css`
          * {
            --light-primary: #f7c622;
            --light-secondary: #36a666;
            --dark-primary: #2f4858;
            --dark-secondary: #006877;
            --white-primary: #ffffff;
            --white-secondary: #e5e5e5;
            --black-primary: #000000;
            --black-secondary: #313131;
            --pokemon-normal: #A8A878;
            --pokemon-fighting:#C13728;
            --pokemon-flying: #A890F0;
            --pokemon-poison: #A35AA0;
            --pokemon-ground: #E0C068;
            --pokemon-rock: #B8A038;
            --pokemon-bug: #A9B820;
            --pokemon-ghost: #705898;
            --pokemon-steel :#B8B8D0;
            --pokemon-fire: #F08030;
            --pokemon-water: #6890F0;
            --pokemon-grass: #78C850;
            --pokemon-electric: #F8D030;
            --pokemon-psychic #EF5D88;
            --pokemon-ice :#98D8D8;
            --pokemon-dragon: #7F82F8;
            --pokemon-dark: #705848;
          }
          body,
          #root {
            background-color: var(--white-secondary);
          }
          .row {
            display: flex;
          }
          .column {
            display: flex;
            flex-direction: column;
          }
          .clearUl {
            list-style: none;
            padding: 0px;
            margin: 0px;
          }
        `}
      />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
