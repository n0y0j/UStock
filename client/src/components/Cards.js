import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardItem from "./CardItem";
import "./Cards.css"

function Cards() {

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
      <p style={{fontSize: "2.2rem", fontWeight: "600", color: "#002952"}}>인기 주식</p>
      <Carousel className="card-carousel" responsive={responsive}>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
          <CardItem tikr="INUV" name="Inovo, Inc." exchange="AMEX" price="2.0000" priceChange="0.2000" change="+10.12%"/>
      </Carousel>
    </div>
  );
}

export default Cards;
