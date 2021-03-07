import React, { useEffect, useState } from "react";
import { Select } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardItem from "./CardItem";
import "./Cards.css";
import "antd/dist/antd.css";

function Cards() {
  const [DropText, setDropText] = useState("선택");

  const { Option } = Select;

  const handleSelectChange = (event) => {
    setDropText(event);
    console.log(event);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1424, min: 200 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 200, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="cards-container">
      <div className="cards-title">
        <p style={{ fontSize: "2.2rem", fontWeight: "600", color: "#002952" }}>
          인기 주식
        </p>
        <div className="cards-select">
          <Select
            defaultValue={DropText}
            style={{ width: 120 }}
            onChange={handleSelectChange}
          >
            <Option value="volume">거래량</Option>
            <Option value="up">상승률</Option>
            <Option value="down">하락률</Option>
            <Option value="high">높은 가격</Option>
            <Option value="low">낮은 가격</Option>
          </Select>
        </div>
      </div>
      <Carousel className="card-carousel" responsive={responsive}>
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
        <CardItem
          tikr="INUV"
          name="Inovo, Inc."
          exchange="AMEX"
          price="2.0000"
          priceChange="0.2000"
          change="+10.12%"
        />
      </Carousel>
    </div>
  );
}

export default Cards;
