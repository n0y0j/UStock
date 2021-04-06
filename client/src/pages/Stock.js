import React from "react";
import CircleProgress from "../components/CircleProgress";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import StockChart from "../components/StockChart";
import "./Stock.css";

function Stock(props) {
  return (
    <div className="main-container">
      <Navbar />
      <Search />
      <div className="content-container">
        <div className="chart-container">
          <div className="chart-title">
            <p>{props.location.state.tikr}</p>
          </div>
          <StockChart tikr={props.location.state.tikr} />
        </div>
        <div className="explain-container">
          <h2>Apple Inc.</h2>
          <p>NASD</p>
          <h3>테마: Technology</h3>
          <h3>거래량: 111,932,640</h3>
          <h3>직원수: 147,000</h3>
          <div className="explain-price">
            <h4>가격: 124.76</h4>
            <p>-0.81</p>
            <p>0.65%</p>
          </div>
        </div>
        {/* <CircleProgress /> */}
      </div>
    </div>
  );
}

export default Stock;
