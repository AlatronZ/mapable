import React from 'react'

const ControlButtons = ({ handleLoad, handleSave }) => {
    return (
        <div>
            <button onClick={handleLoad}>Load Polygons</button>
            <button onClick={handleSave}>Save Polygons</button>
        </div>
    )
}

export default ControlButtons