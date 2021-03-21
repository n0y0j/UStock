import React, {useState} from 'react'
import "./VIX.css"

function VIX() {
    const [Style, setStyle] = useState({})

    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: `${70}%`
        }

        setStyle(newStyle);
    }, 200)

    return (
        <>
            <div className="progress">
                <div className="progress-done" style={Style}>
                    70%
                </div>
            </div>
        </>
    )
}

export default VIX
