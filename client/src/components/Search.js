import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import "./Search.css";
import Chart from "../components/Chart/Chart";
import { timeParse } from "d3-time-format";
import { useQuery, gql } from "@apollo/client";
import VIX from "./Chart/VIX";

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

function Search() {
  const [Data, setData] = useState([]);
  const [TIKR, setTIKR] = useState("");

  const tikrChangeHandler = (event) => {
    setTIKR(event.currentTarget.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

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
      <div className="content-container">
        <div className="chart-container">
          <div className="chart-title">
          <p>S&P500</p>
          </div>
          {StockChart()}
        </div>
        <div className="vix-container">
          <VIX />
        </div>
      </div>
    </div>
  );
}

export default Search;
