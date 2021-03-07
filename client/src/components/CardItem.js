import React from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function CardItem(props) {

    return (
        <div className="card-container">
          <div className="card-title">
            <h1>{props.tikr}</h1>
            <div className="card-subtitle">
              <p>{props.name}</p>
              <p style={{marginTop: "-9%"}}>{props.exchange}</p>
            </div>
          </div>
          <div className="card-price">
            <h1>{props.price}</h1>
            <div className="check-price">
              <AiOutlineCaretUp
                style={{
                  fontSize: "1rem",
                  marginTop: "0.2%",
                  marginRight: "2%",
                }}
              />
              <p style={{ marginRight: "5%" }}>{props.priceChange}</p>
              <p>{props.change}</p>
            </div>
          </div>
        </div>
    )
}

export default CardItem
