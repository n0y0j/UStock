import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import "./Home.css";

function Home() {

  return (
    <>
      <Navbar />
      <Search />
      <Cards />
    </>
  );
}

export default Home;
