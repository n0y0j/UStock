import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import "./Stock.css";

function Stock(props) {

    useEffect(() => {
        console.log(props.location.state.tikr)
    }, [])
  return (
    <div className="main-container">
      <Navbar />
      <Search />
    </div>
  );
}

export default Stock;
