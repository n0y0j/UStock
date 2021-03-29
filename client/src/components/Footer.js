import React from "react";
import { AiFillGithub } from "react-icons/ai";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <h2>Contact</h2>
      <a href="https://github.com/n0y0j/UStock">
        <AiFillGithub />
      </a>
    </div>
  );
}

export default Footer;
