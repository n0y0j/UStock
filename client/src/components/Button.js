import React from "react";
import "./Button.css";

const STYLES = ["btn-primary", "btn-outline", "btn-home"];

const SIZES = ["btn-medium", "btn-small", "btn-homesize"];

const COLOR = ["primary"];

export const Button = ({
  text,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSized = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSized} ${checkButtonColor}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
