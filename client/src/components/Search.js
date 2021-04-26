import React, { useState } from "react";
import { Button } from "./Button";
import { withRouter } from "react-router-dom";
import { Input } from "./Input";
import "./Search.css";
import { useQuery, gql } from "@apollo/client";
import { render } from "react-dom";

const SEARCH_STOCK = gql`
  query SearchStock($type: String!, $tikr: Boolean!) {
    searchStock(type: $type, tikr: $tikr) {
      tikr
    }
  }
`;

function Search({ history }) {
  const [TIKR, setTIKR] = useState("");
  const [TikrList, setTikrList] = useState([]);
  const [Preview, setPreview] = useState([]);

  const tikrChangeHandler = (event) => {
    setTIKR(event.currentTarget.value.toUpperCase());

    var result = TikrList.filter((item) =>
      matchName(item.tikr, event.currentTarget.value.toUpperCase())
    );
    setPreview(result);
  };

  const matchName = (tikr, key) => {
    var keyLen = key.length;

    tikr = tikr.substring(0, keyLen);
    return tikr == key && keyLen != 0;
  };

  const handleClick = (event) => {
    event.preventDefault();
    history.push("/stock", { tikr: TIKR });
  };

  useQuery(SEARCH_STOCK, {
    variables: { type: "", tikr: true },
    onCompleted: (data) => {
      setTikrList(data.searchStock);
    
    },
  });

  const SearchPreview = ({ tikr }) => {
    return <li onClick={ () => setTIKR(tikr)}>{tikr}</li>;
  };

  return (
    <div className="search-container">
      <div className="search-widget-container">
        <Input
          type="text"
          placeholder="티커를 입력해주세요"
          inputStyle="input-home"
          onChange={tikrChangeHandler}
          value={TIKR}
        />
        <Button
          text="검색"
          onClick={handleClick}
          buttonStyle="btn-home"
          buttonSize="btn-homesize"
        />
      </div>
      <div
        className="preview-container"
        style={{ backgroundColor: Preview.length > 0 ? "#F0F0F0" : "", overflow: Preview.length > 0 ? "scroll" : "hidden" }}
      >
        {Preview.length > 0 ? (
          Preview.map((item, index) => {
            return (
              <ul className="preview-text-container">{SearchPreview(item)}</ul>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default withRouter(Search);
