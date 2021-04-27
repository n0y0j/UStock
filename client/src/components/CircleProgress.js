import { React, useState, useEffect } from "react";
import { Progress } from "antd";
import "./CircleProgress.css";

function CircleProgress(props) {
  const [State, setState] = useState({});

  useEffect(() => {
    if (props.value !== null) {
      switch (props.title) {
        case "회사 규모":
          if (props.value > 100000000000) setState({ format: 'A', percent: 100 });
          else if (props.value > 10000000000) setState({ format: 'B', percent: 80 });
          else if (props.value > 1000000000) setState({ format: 'C', percent: 60 });
          else if (props.value > 100000000) setState({ format: 'D', percent: 40 });
          else setState({ format: 'F', percent: 20 });
          break;
        case "거래량":
          if (props.value > 50000000) setState({ format: 'A', percent: 100 });
          else if (props.value > 10000000) setState({ format: 'B', percent: 80 });
          else if (props.value > 1000000) setState({ format: 'C', percent: 60 });
          else if (props.value > 100000) setState({ format: 'D', percent: 40 });
          else setState({ format: 'F', percent: 20 });
          break;
        case "직원 수":
          if (props.value > 50000) setState({ format: 'A', percent: 100 });
          else if (props.value > 10000) setState({ format: 'B', percent: 80 });
          else if (props.value > 5000) setState({ format: 'C', percent: 60 });
          else if (props.value > 1000) setState({ format: 'D', percent: 40 });
          else setState({ F: 20 });
          break;
        case "수익":
          if (props.value > 10000000000) setState({ format: 'A', percent: 100 });
          else if (props.value > 5000000000) setState({ format: 'B', percent: 80 });
          else if (props.value > 1000000000) setState({ format: 'C', percent: 60 });
          else if (props.value > 100000000) setState({ format: 'D', percent: 40 });
          else setState({ format: 'F', percent: 20 });
          break;
        case "순수익":
          if (props.value > 10000000000) setState({ format: 'A', percent: 100 });
          else if (props.value > 1000000000) setState({ format: 'B', percent: 80 });
          else if (props.value > 100000000) setState({ format: 'C', percent: 60 });
          else if (props.value > 10000000) setState({ format: 'D', percent: 40 });
          else setState({ format: 'F', percent: 20 });
          break;
      }
    }
    else {
      setState({ format: 'X', percent: 0 })
    }
  }, [])

  return (
    <div className="circle-container">
      <h2>{props.title}</h2>
      <Progress
        className="circle-progress"
        type="circle"
        percent={State.percent}
        format={() => State.format}
        strokeColor={"#f2709C"}
        strokeWidth={10}
        width={180}
      />
      <p>{props.value !== null ? props.value : "정보 없음"}</p>
    </div>
  );
}

export default CircleProgress;
