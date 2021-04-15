import React, { Component } from "react";
import Chart from 'react-apexcharts'
import './PolarChart.css'

class Polar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["최댓값", "평균값", "최솟값"],
      },
      series: [
        props.data.high,
        props.data.average,
        props.data.low,
      ],
    };
  }

  render() {
    return (
      <div className="polar">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="polarArea"
          width="430"
        />
        <h3>목표 주가</h3>
      </div>
    );
  }
}

export default Polar;
