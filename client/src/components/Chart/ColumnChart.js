import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./ColumnChart.css";

class Column extends Component {
  constructor(props) {
    super(props);

    switch (props.dataType) {
      case "earning":
        this.state = {
            title: "순수익",
          options: {
            xaxis: {
              categories: ["낮은 추정지", "평균 추정치", "높은 추정치"],
            },
          },
          series: [
            {
              name: "올해",
              data: [
                props.data.currentYear.high,
                props.data.currentYear.average,
                props.data.currentYear.low,
              ],
            },
            {
              name: "내년",
              data: [
                props.data.nextYear.high,
                props.data.nextYear.average,
                props.data.nextYear.low,
              ],
            },
          ],
        };
        break;
      case "revenue":
        this.state = {
            title: "수익",
          options: {
            xaxis: {
              categories: ["낮은 추정지", "평균 추정치", "높은 추정치"],
            },
            yaxis: {
                title: {
                    text: '(단위: B)'
                }
            }
          },
          series: [
            {
              name: "올해",
              data: [
                props.data.currentYear.high,
                props.data.currentYear.average,
                props.data.currentYear.low,
              ],
            },
            {
              name: "내년",
              data: [
                props.data.nextYear.high,
                props.data.nextYear.average,
                props.data.nextYear.low,
              ],
            },
          ],
        };
        break;
      case "growth":
        this.state = {
            title: "성장률",
          options: {
            xaxis: {
              categories: ["낮은 추정지", "평균 추정치", "높은 추정치"],
            },
          },
          series: [
            {
              name: "올해",
              data: [
                props.data.currentYear.salesGrowth,
              ],
            },
            {
              name: "내년",
              data: [
                props.data.nextYear.salesGrowth,
              ],
            },
          ],
        };
        break;
    }
  }

  render() {
    return (
      <div className="column">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="430"
        />
        <h3>{this.state.title}</h3>
      </div>
    );
  }
}

export default Column;
