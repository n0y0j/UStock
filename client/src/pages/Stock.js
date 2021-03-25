import React from "react";
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
          <StockChart tikr={props.location.state.tikr}/>
        </div>
      </div>
    </div>
  );
}

export default Stock;
