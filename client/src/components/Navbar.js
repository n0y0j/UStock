import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { RiBankFill } from "react-icons/ri";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link className="nav-title" to="/">
          <RiBankFill style={{ marginRight: "7px", marginBottom: "5px" }} />
          UStock
        </Link>
        <ul className="nav-menu">
          <li>
            <Link className="nav-links" to="/">홈</Link>
          </li>
          <li>
            <Link className="nav-links" to="/">검색</Link>
          </li>
          <li>
            <Link className="nav-links" to="/">프리미엄</Link>
          </li>
        </ul>
        <Link to="/sign">
          <Button text="로그인" buttonStyle="btn-outline" buttonSize="btn-small" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
