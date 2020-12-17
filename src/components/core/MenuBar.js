import React from "react";
import { Link } from "react-router-dom";
/* @jsxImportSource @emotion/react */
// eslint-disable-next-line
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// eslint-disable-next-line
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10%;
  background: #333;
  color: var(--white-primary);
  text-align: center;
  ul {
    list-style: none;
  }
  ul li {
    display: inline-block;
    padding: 0px 20px;
  }
  a {
    transition: all 0.3s ease 0s;
    color: var(--white-secondary);
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    font-size: 15px;
  }
  a:hover {
    color: var(--light-primary);
  }
  img {
    cursor: pointer;
  }
`;

function MenuBar() {
  return (
    <Header>
      <img src="#" alt="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>{" "}
        </li>
        <li>
          <Link to="/user">My Pokémon</Link>
        </li>
      </ul>
    </Header>
  );
}

export default MenuBar;
