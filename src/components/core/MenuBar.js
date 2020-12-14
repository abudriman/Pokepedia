import React from "react";
import { Link } from "react-router-dom";
/* @jsxImportSource @emotion/react */
// eslint-disable-next-line
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// eslint-disable-next-line
const Header = styled.header`
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  a {
    color: #fff;
    text-decration: none;
  }
`;

function MenuBar() {
  return (
    <div>
      <Header>
        <Link to="/">Home</Link>
        <Link to="/pokemon">Detail</Link>
        <Link to="/user">My Pokemon</Link>
      </Header>
    </div>
  );
}

export default MenuBar;
