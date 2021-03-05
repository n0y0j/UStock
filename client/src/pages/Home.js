import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import "./Home.css";
import { useMutation, gql } from '@apollo/client'

const SEARCHSTOCK = gql`
  mutation SearchStock {
    searchStock
  }
`

function Home() {
  const [Check, setCheck] = useState(false)

  useEffect(() => {
    searchStock()
  }, [Check])

  const [searchStock] = useMutation(SEARCHSTOCK, {onCompleted: searchStockCompleted})

  function searchStockCompleted(data) {
    
  }

  return (
    <>
      <Navbar />
      <Cards />
    </>
  );
}

export default Home;
