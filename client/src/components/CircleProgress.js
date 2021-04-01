import React from "react";
import { Progress } from 'antd';

function CircleProgress() {
  return (
    <Progress type="circle" percent={30} format={() => 'A'} strokeColor={"#242424"} strokeWidth={10} width={200} />
  )
}

export default CircleProgress;
