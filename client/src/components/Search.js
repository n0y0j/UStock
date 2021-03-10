import React, { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import './Search.css'

function Search() {

    const [TIKR, setTIKR] = useState("")

    const tikrChangeHandler = (event) => {
        setTIKR(event.currentTarget.value)
    }

    const handleClick = (event) => {
        event.preventDefault();
    }

    return (
        <div className="main-container">
            <div className="search-container">
                <Input type="text" placeholder="티커를 입력해주세요" inputStyle="input-home" onChange={tikrChangeHandler} value={TIKR} />
                <Button
                text="검색"
                onClick={handleClick}
                buttonStyle="btn-home"
                buttonSize="btn-homesize"
              />
            </div>
        </div>
    )
}

export default Search
