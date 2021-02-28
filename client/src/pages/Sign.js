import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import "./Sign.css";

function Sign() {
  const [Click, setClick] = useState(false);
  const handleClick = () => setClick(!Click);

  return (
    <div className="container">
      <div className="sign-up-container">
        <form className="form-container">
          <h1>Sign Up</h1>
          <Input type="email" placeholder="Enter your email" />
          <Input type="text" placeholder="Enter your name" />
          <Input type="password" placeholder="Enter your password" />
          <Input type="password" placeholder="Enter your password" />
          <Button text="가입" />
        </form>
      </div>
      <div className="sign-in-container">
        <form className="form-container">
          <h1>Sign In</h1>
          <Input type="email" placeholder="Enter your email" />
          <Input type="password" placeholder="Enter your password" />
          <Link to='/home'>
          <Button text="입장" />
          </Link>
        </form>
      </div>
      <div className={Click ? "overlay-container active" : "overlay-container"}>
        <div className="overlay-panel">
          <h1 style={{ color: "#fff", fontSize: "3rem", marginBottom: '0px'}}>UStock</h1>
          <p style={{ color: "#fff", fontSize: "1rem" }}>
            한정된 시간으로 최고의 가치를 만듭니다
          </p>
            {Click ? (
              <div className="overlay-btn">
                <p style={{marginBottom: '10px', marginTop: '-10px'}}>아직 아이디가 없으신가요?</p>
              <Button
                text="회원가입"
                onClick={handleClick}
                buttonStyle="btn-outline"
              />
              </div>
            ) : (
              <div className="overlay-btn">
                <p style={{marginBottom: '10px', marginTop: '-10px'}}>이미 아이디가 있으신가요?</p>
              <Button
                text="로그인"
                onClick={handleClick}
                buttonStyle="btn-outline"
              />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Sign;
