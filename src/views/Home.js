import React, { useContext, useState } from "react";
import ListPokemon from "../components/ListPokemon";
import OwnedContext from "../components/context/Owned";
import ReactPaginate from "react-paginate";
import PropType from "prop-types";

function Home({ loading, error, data }) {
  console.log(data);
  const { owned } = useContext(OwnedContext);
  const [perPage] = useState(20);
  const [offset, setOffset] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const updateCurrentData = (selected) => {
    let offset = Math.ceil(selected * perPage);
    setOffset(offset);
    console.log("offset", offset);
    setCurrentData(data.pokemons.results.slice(offset, offset + perPage - 1));
  };
  const handlePageClick = (data) => {
    let selected = data.selected;
    updateCurrentData(selected);
    console.log("selected", selected);
  };

  const pageCount = Math.ceil(data.pokemons.results.length / perPage);

  return (
    <div>
      <h1>Pokemon List</h1>
      <i>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat dolores
        laborum dicta totam sequi amet magnam explicabo facere corrupti,
        possimus aspernatur aperiam ipsam sit fuga veniam molestiae quos
        adipisci et?
      </i>
      <p>total owned pokemon: {owned.length}</p>
      <ul>
        {currentData.map((pokemon) => (
          <ListPokemon key={pokemon.id.toString()} item={pokemon}></ListPokemon>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        initialPage={0}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={9}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

// Home.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.func.isRequired,
//   data: PropTypes.obj.isRequired,
// };

export default Home;
