import React from "react";
import { Progress } from 'antd';
import './CircleProgress.css'

function CircleProgress(props) {

  return (
    <div className="circle-container">
      <h2>{props.title}</h2>
      <Progress className='circle-progress' type="circle" percent={80} format={() => 'A'} strokeColor={"#f2709C"} strokeWidth={10} width={180} />
      <p>{props.value}</p>
    </div>
  )
}

export default CircleProgress;
