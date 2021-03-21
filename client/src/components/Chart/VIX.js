import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./VIX.css";

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
      <div className="progress">
        <div className="progress-done" style={Style}>
          {State}%
        </div>
      </div>
    </>
  );
}

export default VIX;
