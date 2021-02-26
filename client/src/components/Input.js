import React from 'react'
import "./Input.css"

const STYLES = ["input-primary"];

const SIZES = ["input-medium"];

const COLOR = ["primary"]

export const Input = ({
    type,
    placeholder,
    inputStyle,
    inputSize,
    inputColor,
}) => {
    const checkInputStyle = STYLES.includes(inputStyle) ? inputStyle : STYLES[0];

    const checkInputSized = SIZES.includes(inputSize) ? inputSize : SIZES[0];

    const checkInputColor = COLOR.includes(inputColor) ? inputColor : COLOR[0];

    return (
        <input className={`inp ${checkInputStyle} ${checkInputSized} ${checkInputColor}`} type={type} placeholder={placeholder} />
    )
}
