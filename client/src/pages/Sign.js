import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useMutation, gql } from '@apollo/client'
import { withRouter } from 'react-router-dom';
import "./Sign.css";

const REGISTER = gql`
  mutation Register($input: registerInput!) {
    register(input: $input) {
      user {
        name
        email
        password
      }
      message
      success
    }
  }
`

const LOGIN = gql`
  mutation Login($input: loginInput!) {
    login(input: $input) {
      user {
        email
        password
      }
      message
      success
    }
  }
`

function Sign() {
  const [Click, setClick] = useState(false);
  const [Email, setEmail] = useState("")
  const [Email2, setEmail2] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [Password2, setPassword2] = useState("")
  const [RePassword, setRePassword] = useState("")
  
  const handleClick = () => setClick(!Click);

  const emailChangeHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const email2ChangeHandler = (event) => {
    setEmail2(event.currentTarget.value)
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

  const password2ChangeHandler = (event) => {
    setPassword2(event.currentTarget.value)
  }


  
  const singUpHandleSubmit = (event) => {
    event.preventDefault();

    if (Email !== "" && Name !== ""  && Password !== "" && RePassword !== "") {
      if (Password == RePassword) {
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
      else {
        alert("비밀번호가 서로 다릅니다.")
      }
    }
    else {
      alert("입력란을 확인해주세요.")
    }
  }

  const singInHandleSubmit = (event) => {
    event.preventDefault();

    login({
      variables: {
        input: {
          email: Email2,
          password: Password2
        },
      }
    })
  }

  const [login] = useMutation(LOGIN, {onCompleted: loginCompleted})

  function loginCompleted(data) {
    alert(data.login.message)

    // if (data.login.success) {
    //   this.props.history.push('/home')
    // }
    
  }

  const [postRegister] = useMutation(REGISTER, {onCompleted: postRegisterCompleted})

  function postRegisterCompleted(data) {
    alert(data.register.message)
  }

  return (
    <div className="container">
      <div className="sign-up-container">
        <form className="form-container" onSubmit={singUpHandleSubmit}>
          <h1>회원가입</h1>
          <Input type="email" placeholder="이메일을 입력해주세요" onChange={emailChangeHandler} value={Email} />
          <Input type="text" placeholder="닉네임을 입력해주세요" onChange={nameChangeHandler} value={Name} />
          <Input type="password" placeholder="비밀번호를 입력해주세요" onChange={passwordChangeHandler} value={Password} />
          <Input type="password" placeholder="비밀번호를 다시 입력해주세요"  onChange={rePasswordChangeHandler} value={RePassword}/>
          <Button text="가입" />
        </form>
      </div>
      <div className="sign-in-container">
        <form className="form-container" onSubmit={singInHandleSubmit}>
          <h1>로그인</h1>
          <Input type="email" placeholder="이메일을 입력해주세요" onChange={email2ChangeHandler} value={Email2} />
          <Input type="password" placeholder="비밀번호를 입력해주세요" onChange={password2ChangeHandler} value={Password2}/>
          <Button text="입장" />
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
                <p style={{marginBottom: '10px', marginTop: '-10px'}}>이미 아이디가 있으신가요?</p>
              <Button
                text="로그인"
                onClick={handleClick}
                buttonStyle="btn-outline"
              />
              </div>
            ) : (
              <div className="overlay-btn">
                <p style={{marginBottom: '10px', marginTop: '-10px'}}>아직 아이디가 없으신가요?</p>
              <Button
                text="회원가입"
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
