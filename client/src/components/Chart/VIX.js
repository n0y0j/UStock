import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { ReactSVG } from "react-svg"
import "./VIX.css";

import excitement from "../../assets/icons/excitement.svg"
import blank from "../../assets/icons/blank.svg"
import fear from "../../assets/icons/fear.svg"
import death from "../../assets/icons/death.svg"



const VIX_DATA = gql`
  query VixData {
    vixData
  }
`;

function VIX() {
  const [Style, setStyle] = useState({});
  const [State, setState] = useState(0);

  const { loading, error } = useQuery(VIX_DATA, {
    onCompleted: (data) => {
      setState(data.vixData);
      const newStyle = {
        opacity: 1,
        width: `${data.vixData}%`,
      };

      setTimeout(() => {
        setStyle(newStyle);
      }, 100);
    },
  });

  if (loading) return <p></p>;
  if (error) return <p></p>;

  return (
    <>
      <div className="container">
        <div className="status-container">
          <div className="vix-title">
            <p>공포지수</p>
          </div>
          <div className="progrss-container">
            <div className="emoji-container">
                <ReactSVG src={excitement} />
                <ReactSVG src={blank} style={{position: "relative", left: "33%"}}/>
                <ReactSVG src={fear} style={{position: "relative", left: "43%"}}/>
                <ReactSVG src={death} style={{position: "relative", left: "61%"}} />
            </div>
            <div className="progress">
              <div className="progress-done" style={Style}>
                {State}%
              </div>
            </div>
            <div className="emoji-title">
                <p style={{position: "relative", left: "-0.5%"}}>강한 매수</p>
                <p style={{position: "relative", left: "33.6%"}}>보통</p>
                <p style={{position: "relative", left: "47%"}}>매도</p>
                <p style={{position: "relative", left: "66.5%"}}>강한 매도</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VIX;
