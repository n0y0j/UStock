import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { RiBankFill } from "react-icons/ri";
import { BiMenu } from "react-icons/bi";
import { useRecoilState } from 'recoil';
import { nameState, IDState } from '../models/AuthState';
import "./Navbar.css";

function Navbar() {
  const [Click, setClick] = useState(false);
  const [ViewButton, setViewButton] = useState(true);


  const [ Nickname, setNickname ] = useRecoilState(nameState)
  const [ ID, setID ] = useRecoilState(IDState)

  const handleClick = () => setClick(!Click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) setViewButton(false);
    else setViewButton(true);
  };

  const logout = () => {
    setNickname("")
    setID("")
  }

  useEffect(() => {
    showButton();
    window.localStorage.setItem("nickname", Nickname)
    window.localStorage.setItem("id", ID)
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
            <Link className="nav-links" to="/premium">
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
          Nickname === "" ?
          <Link to="/sign">
            <Button
              text="로그인"
              buttonStyle="btn-outline"
              buttonSize="btn-small"
            />
          </Link>
          :
          <div className="nickname-container">
            <h4>{Nickname}님</h4>
            <Button
              text="로그아웃"
              buttonStyle="btn-outline"
              buttonSize="btn-homesize"
              onClick={logout}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
