import React from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function CardItem(props) {

    const priceWidet = (changePrice) => {
      if (changePrice > 0) {
        return (
          <div className="check-price">
              <AiOutlineCaretUp
                style={{
                  fontSize: "1rem",
                  marginTop: "0.2%",
                  marginRight: "2%",
                }}
              />
              <p style={{ marginRight: "2%" }}>{props.changePrice}</p>
              <p>{props.change}%</p>
            </div>
        )
      }
      else {
        return (
          <div className="check-price">
              <AiOutlineCaretDown
                style={{
                  fontSize: "1rem",
                  marginTop: "0.2%",
                  marginRight: "2%",
                  color: 'blue'
                }}
              />
              <p style={{ marginRight: "2%", color: 'blue' }}>{props.changePrice}</p>
              <p style={{color: 'blue'}}>{props.change}%</p>
            </div>
        )
      }
    }

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
            {priceWidet(props.changePrice)}
          </div>
        </div>
    )
}

export default CardItem
