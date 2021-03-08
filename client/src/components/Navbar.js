import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { RiBankFill } from "react-icons/ri";
import { BiMenu } from "react-icons/bi";
import "./Navbar.css";

function Navbar() {
  const [Click, setClick] = useState(false);
  const [ViewButton, setViewButton] = useState(true);

  const handleClick = () => setClick(!Click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) setViewButton(false);
    else setViewButton(true);
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link className="nav-title" to="/" onClick={closeMobileMenu}>
          <RiBankFill style={{ marginRight: "7px", marginBottom: "5px" }} />
          UStock
        </Link>
        <ul className={Click ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link className="nav-links" to="/">
              홈
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/">
              검색
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/">
              프리미엄
            </Link>
          </li>
          <li>
            {!ViewButton && <Link className="nav-links" to="/sign">
            <Button
              text="로그인"
              buttonStyle="btn-outline"
              buttonSize="btn-small"
            />
          </Link>}
          </li>
        </ul>
        {!ViewButton ? (
          <BiMenu style={{fontSize: "3rem", color: "#fff"}} onClick={handleClick}/>
        ) : (
          <Link to="/sign">
            <Button
              text="로그인"
              buttonStyle="btn-outline"
              buttonSize="btn-small"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
