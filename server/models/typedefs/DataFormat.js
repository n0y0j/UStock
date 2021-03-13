const { timeParse } = require("d3-time-format");
const fs = require("fs");
const csv = require("csv-parser");

const parseDate = timeParse("%Y-%m-%d");

async function getData(file) {
  return new Promise(function (resolve, reject) {
    let a_list = [];

    fs.createReadStream(file)
      .pipe(csv())
      .on("data", (data) => {
        var temp = {
          date: parseDate(data.Date),
          open: data.Open,
          high: data.High,
          low: data.Low,
          close: data.Close,
          volume: data.Volume,
        };

        a_list.push(temp);
      })
      .on("end", function () {
        resolve(a_list);
      });
  });
}

module.exports = { getData };
