import React, { useState } from "react";
import { Select } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardItem from "./CardItem";
import "./Cards.css";
import "antd/dist/antd.css";
import { useQuery, gql } from "@apollo/client";

const SEARCH_STOCK = gql`
  query SearchStock($type: String!, $tikr: Boolean!) {
    searchStock(type: $type, tikr: $tikr) {
      tikr
      name
      exchange
      sector
      price
      change
      changePrice
      volume
    }
  }
`;

function Cards() {
  const [DropText, setDropText] = useState("선택");
  const [StockData, setStockData] = useState([]);

  const CardItems = () => {
    const { loading, error } = useQuery(SEARCH_STOCK, {
      variables: { type: DropText, tikr: false },
      onCompleted: (data) => {
        setStockData(data.searchStock);
      },
    });

    if (loading) return <p></p>;
    if (error) return <p></p>;

    return (
      <Carousel className="card-carousel" responsive={responsive}>
        {StockData.map(
          ({ tikr, name, exchange, price, changePrice, change }, index) => {
            return (
              <CardItem
                tikr={tikr}
                name={name}
                exchange={exchange}
                price={price}
                changePrice={changePrice}
                change={change}
                key={index}
              />
            );
          }
        )}
      </Carousel>
    );
  };

  const { Option } = Select;

  const handleSelectChange = (event) => {
    setDropText(event);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 2000, min: 1660 },
      items: 4,
      slidesToSlide: 4
    },
    desktop: {
      breakpoint: { max: 1660, min: 1300 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1300, min: 898 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 898, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className="cards-container">
      <div className="cards-title">
        <p style={{ fontSize: "2.2rem", fontWeight: "600", color: "#fff" }}>
          인기 주식
        </p>
        <div className="cards-select">
          <Select
            defaultValue={DropText}
            style={{ width: 120 }}
            onChange={handleSelectChange}
          >
            <Option value="vol">거래량</Option>
            <Option value="up">상승률</Option>
            <Option value="down">하락률</Option>
            <Option value="high">높은 가격</Option>
            <Option value="low">낮은 가격</Option>
          </Select>
        </div>
      </div>
      {CardItems()}
    </div>
  );
}

export default Cards;
