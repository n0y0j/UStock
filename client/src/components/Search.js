import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import "./Search.css";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from "../components/Chart/Chart";

function Search() {
  var currentDate = new Date();
  var temp = new Date();
  temp.setHours(temp.getHours() + 1);

  const data = [
    {
      date: currentDate,
      open: 25.455,
      high: 27.655,
      low: 23.1111,
      close: 26.3384,
      volume: 3012312,
    },
    {
      date: temp,
      open: 26.3384,
      high: 100.655,
      low: 19.1111,
      close: 40.3384,
      volume: 3012312,
    },
  ];

  const [TIKR, setTIKR] = useState("");

  const tikrChangeHandler = (event) => {
    setTIKR(event.currentTarget.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div className="main-container">
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
      <div className="chart-container">
        <TypeChooser>{(type) => <Chart type={type} data={data} />}</TypeChooser>
      </div>
    </div>
  );
}

export default Search;
