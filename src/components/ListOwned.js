import React, { useContext } from "react";
import { openDB } from "idb";
import styled from "@emotion/styled";

const StyledUl = styled.ul`
  justify-content: space-evenly;
  flex-wrap: wrap;
  .list-item {
    background-color: var(--white-primary);
    border-radius: 5px;
    flex-basis: 30%;
    margin-top: 15px;
    .layout-one {
      align-items: center;
      .group-one {
        flex: 1;
        justify-content: space-evenly;
        align-items: center;
        min-width: 140px;
        min-height: 100px;
        margin: 2px 3px;
        p {
          margin: 0px;
          font-size: 18px;
          font-weight: bold;
        }
        p:first-letter {
          text-transform: capitalize;
        }
        h6 {
          margin-bottom: 0px;
          margin-top: 0px;
        }
        .gig-three {
          align-items: center;
        }
      }
    }
    @media (max-width: 735px) {
      .group-one {
        display: flex;
        flex-direction: column;
      }
      .groups {
        display: flex;
        justify-content: space-between;
      }
      .gig-one {
        margin-right: 10px;
      }
      .gig-two {
        margin-left: 10px;
      }
      .gig-three {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }

    @media (min-width: 735px) {
      .group-one {
        display: flex;
        justify-content: space-evenly;
      }
      .groups {
        display: flex;
        justify-content: space-between;
      }

      .gig-one {
        margin-right: 20px;
      }
      .gig-two {
        margin-left: 20px;
      }
    }

    @media (min-width: 929px) {
      .gig-one {
        margin-right: 40px;
      }
      .gig-two {
        margin-left: 40px;
      }
    }

    @media (min-width: 1270px) {
      .gig-one {
        margin-right: 90px;
      }
      .gig-two {
        margin-left: 90px;
      }
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  div {
    margin-top: 20%;
  }
`;
function ListOwned({ owned, setOwned }) {
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
    return (
      <StyledDiv>
        <div>
          <p>You don't own any pokemon :(</p>
        </div>
      </StyledDiv>
    );
  } else {
    return (
      <StyledUl className="column clearUl">
        {owned.map((row) => (
          <li key={row.nickname} className="list-item">
            <div className="row layout-one">
              <div className="row group-one">
                <div className="gig-zero">
                  <img src={row.icon} alt="Icons" className="Icons" />
                </div>
                <div className="groups">
                  <div className="column gig-one">
                    <span>
                      <h6>Name/Species:</h6>
                    </span>
                    <p>{row.pokemonName}</p>
                  </div>
                  <div className="column gig-two">
                    <span>
                      <h6>Nickname:</h6>
                    </span>
                    <p>{row.nickname}</p>
                  </div>
                </div>
                <div className="column gig-three">
                  <button
                    onClick={() => {
                      removePokemon(row.nickname);
                    }}
                  >
                    Release
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </StyledUl>
    );
  }
}

export default ListOwned;
