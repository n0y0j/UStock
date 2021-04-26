import React, { useState } from "react";
import CircleProgress from "../components/CircleProgress";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import StockChart from "../components/StockChart";
import { useQuery, gql } from "@apollo/client";
import "./Stock.css";
import Donut from "../components/Chart/DonutChart";
import Polar from "../components/Chart/PolarChart";
import Column from "../components/Chart/ColumnChart";

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

  const ViewStockInfo = () => {
    const { loading, error } = useQuery(SEARCH_STOCK, {
      variables: { type: props.location.state.tikr },
      onCompleted: (data) => {
        setStockInfo(data.stockData);
      },
    });

    if (loading) return <p></p>;
    if (error) return <p></p>;

    if (StockInfo === null) {
      return (
        <>
          <div className="stock-error-container">
            <p>티커를 확인 후 다시 입력해주세요</p>
          </div>
        </>
      );
    } else {
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
              {StockInfo.hasOwnProperty("marketCap") &&
              StockInfo.tikr === props.location.state.tikr ? (
                <CircleProgress title="회사 규모" value={StockInfo.marketCap} />
              ) : (
                <></>
              )}
              {StockInfo.hasOwnProperty("volume") &&
              StockInfo.tikr === props.location.state.tikr ? (
                <CircleProgress title="거래량" value={StockInfo.volume} />
              ) : (
                <></>
              )}
              {StockInfo.hasOwnProperty("employees") &&
              StockInfo.tikr === props.location.state.tikr ? (
                <CircleProgress title="직원 수" value={StockInfo.employees} />
              ) : (
                <></>
              )}
              {StockInfo.hasOwnProperty("sales") &&
              StockInfo.tikr === props.location.state.tikr ? (
                <CircleProgress title="수익" value={StockInfo.sales} />
              ) : (
                <></>
              )}
              {StockInfo.hasOwnProperty("income") &&
              StockInfo.tikr === props.location.state.tikr ? (
                <CircleProgress title="순수익" value={StockInfo.income} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="stock-body2-container">
            <h2>분석가 평가</h2>
            <div className="stock-target-container">
              <div className="stock-target-chart-container">
                {StockInfo.hasOwnProperty("analyst") &&
                StockInfo.tikr === props.location.state.tikr ? (
                  <Donut data={StockInfo.analyst.priceTarget} />
                ) : (
                  <></>
                )}
                {StockInfo.hasOwnProperty("analyst") &&
                StockInfo.tikr === props.location.state.tikr ? (
                  <Polar data={StockInfo.analyst.priceTarget} />
                ) : (
                  <></>
                )}
              </div>
              <hr />
              <div className="stock-target-chart-container">
                {StockInfo.hasOwnProperty("analyst") &&
                StockInfo.tikr === props.location.state.tikr ? (
                  <Column data={StockInfo.analyst.earning} dataType="earning" />
                ) : (
                  <></>
                )}
                {StockInfo.hasOwnProperty("analyst") &&
                StockInfo.tikr === props.location.state.tikr ? (
                  <Column data={StockInfo.analyst.revenue} dataType="revenue" />
                ) : (
                  <></>
                )}
                {StockInfo.hasOwnProperty("analyst") &&
                StockInfo.tikr === props.location.state.tikr ? (
                  <Column data={StockInfo.analyst.revenue} dataType="growth" />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="stock-content-container">
        <div className="main-search">
          <Search />
        </div>
        {ViewStockInfo()}
      </div>
      <Footer />
    </>
  );
}

export default Stock;
