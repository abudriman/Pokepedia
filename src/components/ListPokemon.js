import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import OwnedContext from "../components/context/Owned";
import styled from "@emotion/styled";
import icon from "../icon_.png";

const countOwned = (array, id) => {
  let count = 0;
  array.map((obj) => (obj["idPokemon"] === id ? (count += 1) : obj));
  return count;
};

const StyledLi = styled.li`
  background-color: var(--white-primary);
  height: 95px;
  margin-bottom: 10px;
  display: flex;
  border-radius:10px;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  :hover{
  box-shadow: 0px 3px 0px 0px var(--dark-primary);

  }
  
  .pokemon-image {
    display:flex;
    flex: 1;
    justify-content:center;
  }

  }
  .pokemon-name {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      margin:0px;
      white-space:nowrap;
      overflow-x:hidden;
      font-size: 18px;
      font-weight: bolder;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  .number-owned {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 24px;
      font-weight: bolder;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  h2:first-letter {
    text-transform: capitalize;
  }
  h6 {
    color: var(--black-secondary);
  }
  h6,
  p {
    margin: 0;
  }
`;

function ListPokemon({ currentData }) {
  const history = useHistory();
  const { owned } = useContext(OwnedContext);
  return currentData.map((item) => (
    <StyledLi
      key={item.id}
      onClick={() => {
        history.push(`/pokemon/${item.name}`);
      }}
    >
      <div className="pokemon-image">
        <img
          src={item.image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://cdn.discordapp.com/attachments/764425388314198027/789166572782223400/Icon_Placeholder.png";
          }}
          alt="pokemon_icon"
        />
      </div>
      <div className="pokemon-name">
        <h6>Name/Species:</h6>
        <h2>{item.name}</h2>
      </div>
      <div className="number-owned">
        <h6># Owned:</h6>
        <p>{countOwned(owned, item.id)}</p>
      </div>
    </StyledLi>
  ));
}

export default ListPokemon;
