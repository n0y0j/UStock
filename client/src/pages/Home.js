import React from "react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import Search from "../components/Search";

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
