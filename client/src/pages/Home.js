import React, { useState } from "react";
import Cards from "../components/Cards";
import VIX from "../components/VIX";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { useQuery, gql } from "@apollo/client";
import Chart from "../components/Chart";
import { timeParse } from "d3-time-format";
import "./Home.css"

const MARKET_DATA = gql`
  query MarketData($tikr: String!) {
    marketData(tikr: $tikr) {
      marketData {
        date
        open
        close
        high
        low
        volume
      }
    }
  }
`;

function Home() {
  const [Data, setData] = useState([]);

  const changeDateParse = (data) => {
    const parseDate = timeParse("%Y-%m-%d");
    var temp = [];
    var count = data.length - 1;

    for (var prop in data) {
      var year = data[count - prop]["date"].substring(0, 4);
      var month = data[count - prop]["date"].substring(5, 7);
      var date = data[count - prop]["date"].substring(8, 10);

      const tempData = {
        date: parseDate(`${year}-${month}-${date}`),
        open: data[count - prop]["open"],
        high: data[count - prop]["high"],
        low: data[count - prop]["low"],
        close: data[count - prop]["close"],
        adjClose: data[count - prop]["adjClose"],
        volume: data[count - prop]["volume"],
        symbol: data[count - prop]["symbol"],
      };

      temp.push(tempData);
    }
    return temp;
  };

  const StockChart = () => {
    const { loading, error } = useQuery(MARKET_DATA, {
      variables: { tikr: "S&P500" },
      onCompleted: (data) => {
        setData(changeDateParse(data.marketData.marketData));
      },
    });

    if (loading) return <p>Loding...</p>;
    if (error) return <p>Error :(</p>;

    return <Chart type={"hybrid"} data={Data} />;
  };

  return (
    <div className="main-container">
      <Navbar />
      <Search />
      <div className="content-container">
        <div className="chart-container">
          <div className="chart-title">
            <p>S&P500</p></div>{StockChart()}</div>
        <div className="vix-container">
        <div className="vix-title">
            <p>공포지수</p>
          </div>
          <VIX />
        </div>
      </div>
      <Cards />
    </div>
  );
}

export default Home;
