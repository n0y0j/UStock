import React from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function CardItem(props) {
  

    const priceWidet = (changePrice) => {
      if (changePrice > 0) {
        return (
          
          <div className="check-price">
              <AiOutlineCaretUp
                style={{
                  fontSize: "1.1rem",
                  marginTop: "-2.5%",
                  marginRight: "4%",
                }}
              />
              <p style={{ marginRight: "4%" }}>{props.changePrice}</p>
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
                  marginTop: "-2.5%",
                  marginRight: "4%",
                  color: 'blue'
                }}
              />
              <p style={{ marginRight: "4%", color: 'blue' }}>{props.changePrice}</p>
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
              <p className={props.name.length > 35 ? "long-sub" : ""}>{props.name}</p>
              <p>{props.exchange}</p>
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
