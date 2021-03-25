import React, { useState } from "react";
import { Button } from "./Button";
import { withRouter } from 'react-router-dom';
import { Input } from "./Input";
import "./Search.css";

function Search({ history }) {
  const [TIKR, setTIKR] = useState("");

  const tikrChangeHandler = (event) => {
    setTIKR(event.currentTarget.value.toUpperCase());
  };

  const handleClick = (event) => {
    event.preventDefault();
    
    history.push('/stock', {tikr: TIKR});
  };

  return (
    <div className="search-container">
      <Input
        type="text"
        placeholder="티커를 입력해주세요"
        inputStyle="input-home"
        onChange={tikrChangeHandler}
        value={TIKR}
      />
      <Button
        text="검색"
        onClick={handleClick}
        buttonStyle="btn-home"
        buttonSize="btn-homesize"
      />
    </div>
  );
}

export default withRouter(Search);
