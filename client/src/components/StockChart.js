import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { timeParse } from "d3-time-format";
import Chart from "./Chart/Chart";

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

function StockChart(props) {
  const [Data, setData] = useState([]);
  console.log(props)
  const changeDateParse = (data) => {
    const parseDate = timeParse("%Y-%m-%d");
    var temp = [];
    for (var prop in data) {
      if (data[prop]["open"] != null) {
        var year = data[prop]["date"].substring(0, 4);
        var month = data[prop]["date"].substring(5, 7);
        var date = data[prop]["date"].substring(8, 10);

        const tempData = {
          date: parseDate(`${year}-${month}-${date}`),
          open: data[prop]["open"],
          high: data[prop]["high"],
          low: data[prop]["low"],
          close: data[prop]["close"],
          adjClose: data[prop]["adjClose"],
          volume: data[prop]["volume"],
          symbol: data[prop]["symbol"],
        };

        temp.push(tempData);
      }
      else continue;
    }
    return temp;
  };

  const GetStockChart = () => {
    const { loading, error } = useQuery(MARKET_DATA, {
      variables: { tikr: props.tikr },
      onCompleted: (data) => {
        setData(changeDateParse(data.marketData.marketData));
      },
    });

    if (loading) return <p></p>;
    if (error) return <p></p>;

    return <Chart type={"hybrid"} data={Data} />;
  };

  return <div>{GetStockChart()}</div>;
}

export default StockChart;
