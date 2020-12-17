import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ListType from "../components/ListType";
import ListMove from "../components/ListMove";
import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";
import Loader from "react-loader-spinner";

/* @jsxImportSource @emotion/react */
// eslint-disable-next-line
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import OwnedContext from "../components/context/Owned";
import icon from "../icon_.png";

const Q_POKEMON_LIST = gql`
  query Pokemon($pokemonName: String!) {
    pokemon(name: $pokemonName) {
      abilities {
        ability {
          name
        }
      }
      height
      weight
      id
      moves {
        move {
          url
          name
        }
      }
      name
      sprites {
        front_default
        back_default
        front_shiny
      }
      types {
        type {
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
  .modal-title,
  .modal-content,
  .modal-bottom {
    background-color: #fefefe;
    margin: auto;
    padding-left: 10px;
    padding-right: 10px;
    /* border: 1px solid #888; */
    width: 50%;
  }
  .modal-title {
  }
  .modal-title h1 {
    margin: 0px;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
  }
  .modal-content h4 {
    margin-bottom: 0px;
  }
  .modal-bottom {
    padding: 10px;
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

const StyledDiv = styled.div`
  /* padding: 15px 10%; */
  @media (max-width: 735px) {
    .content {
      align-items: center;
      flex-direction: column;
    }
    .layout-two {
      flex-basis: 25% !important;
    }
  }
  .content {
    justify-content: center;
  }
  .layout-one {
    flex-basis: 25%;
    margin: 20px;
    .group-one {
      justify-content: space-evenly;
      .icon {
        align-items: center;
        img {
          outline: var(--dark-primary) solid 2px;
        }
        h6 {
          margin-top: 10px;
        }
      }
    }
  }
  .layout-two {
    flex-basis: 30%;
    margin: 20px;
    .group-one {
      padding: 50px 40px 0px 20px;
      p:first-letter {
        text-transform: capitalize;
      }
      p {
        font-size: 28px;
        font-weight: bold;
        margin-right: 10px;
        margin-bottom: 0px;
        margin-top: 0px;
      }
    }

    i {
      padding-top: 10px;
      flex-basis: 100%;
      font-size: 12px;
    }
  }
  .group-two {
    flex: 1;
    .gig-one ul {
      flex-wrap: wrap;
      li {
        margin-top: 2px;
      }
    }
  }
  .group-three {
    flex: 2;
    ul {
      max-height: 400px;
      overflow-y: scroll;
    }
  }
  .group-two,
  .group-three {
    margin: 20px 20px;
    h3 {
      display: inline-block;
      border-bottom: 5px solid var(--light-primary);
      margin-bottom: 5px;
    }
  }
  .artwork {
    width: 100%;
    height: auto;
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

  if (loading)
    return (
      <div
        css={css`
          position: fixed;
          z-index: 1;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          display: flex;
          .child {
            margin: auto;
          }
        `}
      >
        <div className="child">
          <Loader type="Circles" color="#000" height={80} width={80} />
        </div>
      </div>
    );
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
    const db1 = await openDB("PokemonIDB", 1);
    db1
      .add("storePokemon", JSON.stringify(obj), nickname)
      .then((result) => {
        setOwned((owned) => [...owned, obj]);
        setModalDisplay("none");
        setNickname("");
      })
      .catch((err) => {
        console.log(err);
        alert(
          "You're already named other pokemon with that, try something else"
        );
      });
  };

  return (
    <StyledDiv>
      <div className="row content">
        <div className=" column layout-one">
          <img
            className="artwork"
            src={
              imgUrl
                ? imgUrl.sprites.other["official-artwork"].front_default
                : false
            }
            alt="No official artwork available"
            width="500"
            height="500"
          ></img>
          <div className="row group-one">
            <div className="icon column">
              <img
                src={data.pokemon.sprites.front_default}
                alt="front_default"
              />
              <h6>Front Default</h6>
            </div>
            <div className="icon column">
              <img src={data.pokemon.sprites.back_default} alt="back_default" />
              <h6>Back Default</h6>
            </div>
            <div className="icon column">
              <img src={data.pokemon.sprites.front_shiny} alt="front_shiny" />
              <h6>Front Shiny</h6>
            </div>
          </div>
        </div>
        <div className=" column layout-two">
          <div className="column group-one">
            <div className="row gig-one">
              <p>
                {pokemonName} #{data.pokemon.id}
              </p>
              <button onClick={() => catchPokemon()}>Catch</button>
            </div>
            <i>Press button "Catch" above to catch this pokemon (50% Chance)</i>
          </div>

          <div className="row groups">
            <div className="column group-two">
              <div className="gig-one">
                <span>
                  <h3>Types</h3>
                </span>
                <ul className="clearUl row">
                  {data.pokemon.types.map((slot) => (
                    <ListType key={uuidv4()} slot={slot}></ListType>
                  ))}
                </ul>
              </div>
              <div className="gig-two">
                <span>
                  <h3>Height/Weight</h3>
                </span>
                <p>
                  {data.pokemon.height}/{data.pokemon.weight}
                </p>
              </div>
              <div className="gig-three">
                <span>
                  <h3>Abilities</h3>
                </span>

                <ul className="clearUl">
                  {data.pokemon.abilities.map((item) => (
                    <li key={uuidv4()}>{item.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="column group-three">
              <span>
                <h3>Moves</h3>
              </span>
              <ul className="clearUl">
                {data.pokemon.moves.map((item) => (
                  <ListMove key={uuidv4()} item={item}></ListMove>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal style={{ display: modalDisplay }}>
        <div className="modal-title">
          <span className="close" onClick={() => setModalDisplay("none")}>
            &times;
          </span>
          <h1>You've catch {pokemonName}, Congrats!</h1>
        </div>
        <div className="modal-content">
          <h4>Let's give it a nickname:</h4>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="modal-bottom">
          <button onClick={() => addPokemon(nickname, data.pokemon.id)}>
            proceed
          </button>
          <button onClick={() => setModalDisplay("none")}>release</button>
        </div>
      </Modal>
    </StyledDiv>
  );
}

export default Pokemon;
