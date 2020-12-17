import React, { useState, useContext, useEffect } from "react";
import ListOwned from "../components/ListOwned";
import styled from "@emotion/styled";
import OwnedContext from "../components/context/Owned";

const StyledDiv = styled.div`
  padding: 15px 10%;
  input {
    padding: 10px;
    border-radius: 30px;
    align-self: stretch;
  }
  i {
    color: var(--black-secondary);
    margin-bottom: 20px;
  }
`;

function User() {
  const { owned, setOwned } = useContext(OwnedContext);
  const [filteredData, setFilteredData] = useState([]);

  const filterSearch = (searchKeyword) => {
    var updatedList = owned;
    if (searchKeyword === "") {
      setFilteredData(updatedList);
      return false;
    }
    updatedList = updatedList.filter((item) => {
      return (
        item.pokemonName.toLowerCase().indexOf(searchKeyword.toLowerCase()) !==
        -1
      );
    });
    setFilteredData(updatedList);
  };

  useEffect(() => {
    setFilteredData(owned);
  }, [owned]);

  return (
    <StyledDiv className="column">
      <h1>My Pokémon</h1>
      <i>
        Pokémons you've catch goes into this list. You can either choose to
        release it or just keep it as a collection.
      </i>
      <input
        type="text"
        placeholder="Search by name. ex: Pikachu, Ditto, Charizard ..."
        onChange={(e) => {
          filterSearch(e.target.value);
        }}
      />
      <div className="content">
        <ListOwned owned={filteredData} setOwned={setOwned}></ListOwned>
      </div>
    </StyledDiv>
  );
}

export default User;
