import { csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";
import file from "./data.csv";

function parseData(parse) {
  return function (d) {

    if (d.Open > 0) {
      var data = {
        date: parse(d.Date),
        open: d.Open,
        high: d.High,
        low: d.Low,
        close: d.Close,
        volume: d.Volume,
      }

      return data;
    }    
  };
}

const parseDate = timeParse("%Y-%m-%d");

export async function getData() {
  const promiseSnp = await fetch(file)
  const response = await promiseSnp.text()
  // console.log(response)
  return csvParse(response, parseData(parseDate))
}
