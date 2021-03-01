import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useMutation, gql } from '@apollo/client'
import "./Sign.css";

const REGISTER = gql`
  mutation Register($input: registerInput!) {
    register(input: $input) {
      email
      name
      password
    }
  }
`

function Sign() {
  const [Click, setClick] = useState(false);
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [RePassword, setRePassword] = useState("")
  
  const handleClick = () => setClick(!Click);

  const emailChangeHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const nameChangeHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const rePasswordChangeHandler = (event) => {
    setRePassword(event.currentTarget.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    postRegister({
      variables: {
        input: {
          email: Email,
          name: Name,
          password: Password
        },
      }
    })
  
  }

  const [postRegister] = useMutation(REGISTER, {onCompleted: postRegisterCompleted})

  function postRegisterCompleted(data) {
    console.log(data)
    alert(`계정이 생성되었습니다.`)
  }

  return (
    <div className="container">
      <div className="sign-up-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <Input type="email" placeholder="Enter your email" onChange={emailChangeHandler} value={Email} />
          <Input type="text" placeholder="Enter your name" onChange={nameChangeHandler} value={Name} />
          <Input type="password" placeholder="Enter your password" onChange={passwordChangeHandler} value={Password} />
          <Input type="password" placeholder="Enter your password"  onChange={rePasswordChangeHandler} value={RePassword}/>
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
