import React, { useContext, useState } from "react";
import ListPokemon from "../components/ListPokemon";
import OwnedContext from "../components/context/Owned";
import ReactPaginate from "react-paginate";
import Autosuggest from "react-autosuggest";
import { useHistory } from "react-router-dom";
/* @jsxImportSource @emotion/react */
// eslint-disable-next-line
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
//got no time to check proptype
// import PropType from "prop-types";
import Loader from "react-loader-spinner";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    color: var(--dark-primary);
  }

  .container {
    padding: 15px 10%;
    display: flex;
    flex-direction: column;
    i {
      color: var(--black-secondary);
    }
  }

  .mid-level-content {
    align-items: center;
  }

  .react-autosuggest__container {
    flex-grow: 1;
    display: flex;
    width: 100%;
    flex-direction: column;
    /* align-items: center; */
    input {
      padding: 10px;
      border-radius: 30px;
      flex-grow: 1;
    }
    .react-autosuggest__suggestions-container {
      position: absolute;
      z-index: 1;
      margin-top: 20px;
      width: 70%;
      align-self: center;
    }
  }
  .react-autosuggest__suggestions-list {
    list-style: none;
    background-color: var(--dark-primary);
    li {
      color: white;
      border-bottom: 1px solid black;
      cursor: pointer;
    }
  }
  .react-autosuggest__container--open {
    display: flex;
  }

  ul.pagination {
    /* align-self: center; */
    display: inline-block;
    padding: 0;
    margin: 20px 0;
  }

  ul.pagination li {
    display: inline;
    cursor: pointer;
  }

  ul.pagination li a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: all 0.3s ease 0s;
  }

  ul.pagination li a:hover {
    background-color: var(--dark-primary);
    border-radius: 5px;
    color: white;
  }

  ul.pagination li.active a {
    background-color: var(--light-primary);
    border-radius: 5px;
  }

  ul.pokemon-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-inline-start: 0;
    align-self: stretch;
    justify-content: space-between;
  }
`;

function Home({ loading, error, data }) {
  const { owned } = useContext(OwnedContext);
  const [perPage] = useState(20);
  //eslint-disable-next-line
  const [offset, setOffset] = useState(0);
  const [forcePage, setForcePage] = useState();
  const [currentData, setCurrentData] = useState([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const history = useHistory();

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

  const pageCount = Math.ceil(data.pokemons.results.length / perPage);
  const updateCurrentData = (selected) => {
    let offset = Math.ceil(selected * perPage);
    setOffset(offset);
    setForcePage(selected);
    setCurrentData(data.pokemons.results.slice(offset, offset + perPage - 1));
  };
  const handlePageClick = (data) => {
    let selected = data.selected;
    updateCurrentData(selected);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data.pokemons.results.filter(
          (pokemon) =>
            pokemon.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div
      css={css`
        display: flex;
        span {
          flex: 1;
        }
        h2 {
          flex: 2;
        }
      `}
    >
      <span>
        <img src={suggestion.image} alt="icon" />
      </span>
      <h2
        onClick={() => {
          history.push(`/pokemon/${suggestion.name}`);
        }}
      >
        {suggestion.name}
      </h2>
    </div>
  );
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search by name. i.e. Pikachu, Ditto, Charizard ...",
    value,
    onChange: onChange,
  };

  return (
    <StyledDiv>
      <div className="container">
        <h1>Pokémon List</h1>
        <i>
          This list shows all pokémon fetched from pokeapi.co. You can start to
          explore this app by click or tap on pokémon on the list below. Gotta
          Catch 'Em All!
        </i>
        <h4>Total owned pokemon: {owned.length}</h4>
      </div>
      <div className="container mid-level-content">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          initialPage={0}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          forcePage={forcePage}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        ></ReactPaginate>
        <ul className="pokemon-list">
          <ListPokemon currentData={currentData}></ListPokemon>
        </ul>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          initialPage={0}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={forcePage}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        ></ReactPaginate>
      </div>
    </StyledDiv>
  );
}

// Home.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.func.isRequired,
//   data: PropTypes.obj.isRequired,
// };

export default Home;
