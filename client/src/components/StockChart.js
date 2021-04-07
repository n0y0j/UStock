import React, {useState} from 'react'
import { useQuery, gql } from "@apollo/client";
import { timeParse } from "d3-time-format";
import Chart from './Chart/Chart';

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
    

    const GetStockChart = () => {
        const { loading, error } = useQuery(MARKET_DATA, {
          variables: { tikr: props.tikr },
          onCompleted: (data) => {
            setData(changeDateParse(data.marketData.marketData));
          },
        });
    
        if (loading) return <p>Loding...</p>;
        if (error) return <p>Error :(</p>;
    
        return <Chart type={"hybrid"} data={Data} width={props.width} />;
      };
    
    return (
        <div>
            {GetStockChart()}
        </div>
    )
}

export default StockChart
