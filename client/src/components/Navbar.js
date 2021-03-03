import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { RiBankFill } from "react-icons/ri";
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-container">
          <Link className="nav-title" to="/"><RiBankFill style={{marginRight: '7px', marginBottom: '5px'}} /> UStock</Link>
        <ul className="nav-menu">
          <li>
            <Link className="nav-links">홈</Link>
          </li>
          <li>
            <Link className="nav-links">검색</Link>
          </li>
          <li>
            <Link className="nav-links">프리미엄</Link>
          </li>
        </ul>
        <Button text="로그인" buttonStyle="btn-outline" />
      </div>
    </div>
  );
}

export default Navbar;
