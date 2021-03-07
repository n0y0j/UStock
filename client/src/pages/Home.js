import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {

  return (
    <>
      <Navbar />
      <Cards />
    </>
  );
}

export default Home;
