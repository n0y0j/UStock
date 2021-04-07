import React from "react";
import CircleProgress from "../components/CircleProgress";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import StockChart from "../components/StockChart";
import "./Stock.css";

function Stock(props) {
  return (
    <>
      <Navbar />
      <div className="stock-content-container">
        <Search />
        <div className="stock-chart-container">
          <h2>Apple Inc.</h2>
          <p>NASD</p>
          <div className="stock-chart-title">
            <p>{props.location.state.tikr}</p>
          </div>
          <StockChart tikr={props.location.state.tikr} />
        </div>
      </div>
      <div className="stock-body-container">
        <h2>회사 정보</h2>
        <div className="stock-body-content-container">
          <CircleProgress title="회사 규모" value="2104.18B" />
          <CircleProgress title="거래량" value="111,932,640" />
          <CircleProgress title="직원 수" value="147,000" />
          <CircleProgress title="수익" value="294.13B" />
          <CircleProgress title="순수익" value="63.93B" />
        </div>
        <hr />
        <h2>분석가 평가</h2>
        <div className="stock-body-content-container">
          <CircleProgress title="회사 규모" value="2104.18B" />
          <CircleProgress title="거래량" value="111,932,640" />
          <CircleProgress title="직원 수" value="147,000" />
          <CircleProgress title="수익" value="294.13B" />
          <CircleProgress title="순수익" value="63.93B" />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Stock;
