import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ListType from "../components/ListType";
import ListMove from "../components/ListMove";
import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

/* @jsxImportSource @emotion/react */
// eslint-disable-next-line
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import OwnedContext from "../components/context/Owned";

const Q_POKEMON_LIST = gql`
  query Pokemon($pokemonName: String!) {
    pokemon(name: $pokemonName) {
      id
      name
      sprites {
        front_default
      }
      types {
        slot
        type {
          url
          name
        }
      }
      moves {
        move {
          url
          name
        }
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const PokemonNameHeading = styled.h1`
  :first-letter {
    text-transform: capitalize;
  }
`;

function Pokemon() {
  const { pokemonName } = useParams();
  //fetch rest api karena sprites di poke-graphql ga include gambar artwork.
  const BASE_URL = "https://pokeapi.co/api/v2";
  const POKEMON_DETAIL_URL = BASE_URL + "/pokemon/" + pokemonName;
  const [imgUrl, setImgUrl] = useState();
  const [modalDisplay, setModalDisplay] = useState("none");
  const [nickname, setNickname] = useState("");
  const { loading, error, data } = useQuery(Q_POKEMON_LIST, {
    variables: { pokemonName },
  });

  //eslint-disable-next-line
  const { owned, setOwned } = useContext(OwnedContext);

  useEffect(() => {
    const getArtwork = function (url) {
      fetch(url)
        .then((res) => res.json())
        .then((json) => setImgUrl(json));
    };
    getArtwork(POKEMON_DETAIL_URL);
  }, [POKEMON_DETAIL_URL]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const catchPokemon = () => {
    let isSuccess = Math.random() < 0.5 ? 0 : 1;
    if (isSuccess) {
      //berhsil ditangkap yuhuu, kasih nickname + masukin idb
      return setModalDisplay("block");
    } else {
      //yah gagal, kasih notif coba lagi
      return alert("Failed");
    }
  };

  const addPokemon = async (nickname, id) => {
    if (!nickname) {
      return alert("Nickname cannot be empty");
    }
    let obj = {
      idPokemon: id,
      nickname: nickname,
      pokemonName: pokemonName,
      icon: imgUrl.sprites.front_default,
      artwork: imgUrl.sprites.other["official-artwork"].front_default,
    };
    const db1 = await openDB("pokepedia", 1);
    db1
      .add("pokemon", JSON.stringify(obj), nickname)
      .then((result) => {
        setOwned((owned) => [...owned, obj]);
        setModalDisplay("none");
      })
      .catch((err) => {
        console.log(err);
        alert(
          "You're already named other pokemon with that, try something else"
        );
      });
    db1.close();
  };

  return (
    <div>
      <img
        src={
          imgUrl
            ? imgUrl.sprites.other["official-artwork"].front_default
            : false
        }
        alt="No official artwork available"
        width="500"
        height="500"
      ></img>
      <PokemonNameHeading>{pokemonName}</PokemonNameHeading>
      <button onClick={() => catchPokemon()}>Catch</button>
      <h3>Types</h3>
      <ul>
        {data.pokemon.types.map((slot) => (
          <ListType key={uuidv4()} slot={slot}></ListType>
        ))}
      </ul>
      <h3>Moves</h3>
      <ul>
        {data.pokemon.moves.map((item) => (
          <ListMove key={uuidv4()} item={item}></ListMove>
        ))}
      </ul>
      {/* modal */}

      <Modal style={{ display: modalDisplay }}>
        <div className="modal-content">
          <span className="close" onClick={() => setModalDisplay("none")}>
            &times;
          </span>
          <h1>You've catch {pokemonName}, Congrats!</h1>
          <p>give it a nickname:</p>
          <input type="text" onChange={(e) => setNickname(e.target.value)} />
          <button onClick={() => addPokemon(nickname, data.pokemon.id)}>
            proceed
          </button>
          <button onClick={() => setModalDisplay("none")}>release</button>
        </div>
      </Modal>
    </div>
  );
}

export default Pokemon;
