import React from "react";
import Navbar from "../components/Navbar";
import "./Premium.css";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"
import { FaHandshake } from "react-icons/fa"
import Footer from "../components/Footer";
import Paypal from "../components/Paypal";
import { useRecoilValue } from 'recoil'
import { IDState, nameState } from '../models/AuthState'

function Premium() {
  const name = useRecoilValue(IDState)
  const id = useRecoilValue(nameState)

  return (
    <>
      <Navbar />
      <div className="premium-container">
        <div className="premium-card-container">
          <div className="premium-card-content">
            <h2>월 1900원에 특별한 혜택을 만나보세요!</h2>
            <div className="premium-card-features">
              <div className="features-container">
                <div className="features-icon">
                  <AiFillStar />
                </div>
                <div className="features-text">
                  <h4>기업 신뢰점수 제공</h4>
                  <p>
                    투자하시는 기업의 규모, 수익, 성장성 등을 분석하여
                    신뢰점수를 제공합니다
                  </p>
                </div>
              </div>
              <div className="features-container">
                <div className="features-icon">
                  <GiPerspectiveDiceSixFacesRandom />
                </div>
                <div className="features-text">
                  <h4>오늘의 추천 주식</h4>
                  <p>
                    UStock이 추천하는 상위 신뢰점수의 기업들을 랜덤으로 추천합니다
                  </p>
                </div>
              </div>
              <div className="features-container">
                <div className="features-icon">
                  <AiOutlineSearch />
                </div>
                <div className="features-text">
                  <h4>세부사항 검색 기능</h4>
                  <p>
                    특정 회사의 뉴스, 소식 등을 실시간으로 제공합니다
                  </p>
                </div>
              </div>
              <div className="features-container">
                <div className="features-icon">
                  <FaHandshake />
                </div>
                <div className="features-text">
                  <h4>고객들과 같이 걷는 미래</h4>
                  <p>
                    매달 첫째주 월요일 UStock이 추천하는 동전 주식을 선물로 드립니다
                  </p>
                </div>
              </div>
            </div>
            { name !== "" && id !== "" ? <Paypal name={name} id={id} /> : <p className="premium-card-p">로그인 후 구매할 수 있습니다</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Premium;
