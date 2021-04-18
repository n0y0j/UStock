import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import VIX from "../components/VIX";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import "./Home.css";
import StockChart from "../components/StockChart";
import Footer from "../components/Footer";
import { useQuery, gql } from "@apollo/client";
import _ from "lodash";

const USER = gql`
  query User($email: String!) {
    user(email: $email) {
      name
    }
  }
`;

function Home(props) {
  const [Name, setName] = useState("");

  // const UserInfo = () => {

  //   const { loading, error } = useQuery(USER, {
  //     variables: { email: _.has(props.location.state) ? props.location.state.email : "" },
  //     onCompleted: (data) => {
  //       console.log(data);
  //     },
  //   });

  //   if (loading) return <></>;
  //   if (error) return alert(error);

  // };

  return (
    <div className="main-container">
      <Navbar />
      <Search />
      <div className="content-container">
        <div className="chart-container">
          <div className="chart-title">
            <p>S&P500</p>
          </div>
          <StockChart tikr="S&P500" />
        </div>
        <div className="vix-container">
          <div className="vix-title">
            <p>공포지수</p>
          </div>
          <VIX />
        </div>
      </div>
      <Cards />
      <Footer />
    </div>
  );
}

export default Home;
