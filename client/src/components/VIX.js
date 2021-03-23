import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { ReactSVG } from "react-svg"
import "./VIX.css";

import excitement from "../assets/icons/excitement.svg"
import blank from "../assets/icons/blank.svg"
import fear from "../assets/icons/fear.svg"
import death from "../assets/icons/death.svg"



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
          <div className="progrss-container">
            <div className="emoji-container">
                <ReactSVG src={excitement}/>
                <p></p>
                <ReactSVG src={blank}/>
                <ReactSVG src={fear}/>
                <ReactSVG src={death} />
            </div>
            <div className="progress">
              <div className="progress-done" style={Style}>
                {State}%
              </div>
            </div>
            <div className="emoji-title">
                <p>강한 매수</p>
                <p></p>
                <p style={{position: "relative", right: "1.5%"}}>보통</p>
                <p style={{position: "relative", left: "1%"}}>매도</p>
                <p>강한 매도</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VIX;
