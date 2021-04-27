import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./DonutChart.css";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: props.data.numberOfAnalysts,
      options: {
        labels: ["매수", "보유", "매도"],
      },
      series: [props.data.buy, props.data.hold, props.data.sell],
    };
  }

  render() {
    if (this.props.data.numberOfAnalysts !== null) {
      return (
        <div className="donut">
          <div className="donut-title">
            <h3>분석가 수</h3>
            <h4>{this.state.number}</h4>
          </div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            width="430"
          />
          <h3>분석가 추천</h3>
        </div>
      );
    } else return <></>;
  }
}

export default Donut;
