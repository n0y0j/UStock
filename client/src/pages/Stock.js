import React, { useState, useEffect } from "react";
import CircleProgress from "../components/CircleProgress";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import StockChart from "../components/StockChart";
import { useQuery, gql } from "@apollo/client";
import "./Stock.css";
import Donut from "../components/Chart/DonutChart";
import Polar from "../components/Chart/PolarChart";

const SEARCH_STOCK = gql`
  query StockData($type: String!) {
    stockData(tikr: $type) {
      tikr
      name
      exchange
      sector
      marketCap
      income
      sales
      employees
      price
      change
      changePrice
      volume
      analyst
    }
  }
`;

function Stock(props) {
  const [StockInfo, setStockInfo] = useState({});

  useEffect(() => {
    console.log("hi")
  }, [])

  const ViewStockInfo = () => {
    const { loading, error } = useQuery(SEARCH_STOCK, {
      variables: { type: props.location.state.tikr },
      onCompleted: (data) => {
        setStockInfo(data.stockData);
      },
    });

    if (loading) return <p>Loding...</p>;
    if (error) return <p>Error :(</p>;

      return (
        <>
          <div className="stock-chart-container">
            <h2>{StockInfo.name}</h2>
            <p>{StockInfo.exchange}</p>
            <div className="stock-chart-title">
              <p>{props.location.state.tikr}</p>
            </div>
            <StockChart tikr={props.location.state.tikr} />
          </div>
          <div className="stock-body-container">
            <h2>회사 정보</h2>
            <h3>테마: {StockInfo.sector}</h3>
            <div className="stock-body-content-container">
              <CircleProgress title="회사 규모" value={StockInfo.marketCap} />
              <CircleProgress title="거래량" value={StockInfo.volume} />
              <CircleProgress title="직원 수" value={StockInfo.employees} />
              <CircleProgress title="수익" value={StockInfo.sales} />
              <CircleProgress title="순수익" value={StockInfo.income} />
            </div>
          </div>
          <div className="stock-body2-container">
            <h2>분석가 평가</h2>
            <div className="stock-target-container">
              <div className="stock-target-chart-container">
                {StockInfo.hasOwnProperty('analyst') && StockInfo.tikr === props.location.state.tikr ? <Donut data={StockInfo.analyst.priceTarget} /> : <></>}
                {StockInfo.hasOwnProperty('analyst') && StockInfo.tikr === props.location.state.tikr ? <Polar data={StockInfo.analyst.priceTarget} />: <></>}
              </div>
            </div>
          </div>
        </>
      );
  
  };

  return (
    <>
      <Navbar />
      <div className="stock-content-container">
        <Search />
        {ViewStockInfo()}
      </div>
      <Footer />
    </>
  );
}

export default Stock;
