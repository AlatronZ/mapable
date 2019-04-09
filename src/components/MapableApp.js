import React, { useState } from 'react'

import Header from './Header';
import AddressFinderForm from './AddressFinderForm';
import ControlButtons from './ControlButtons';
import MapComponent from './MapComponent';

//Home: Abletech
const latHome = -41.294018;
const longHome = 174.777596;
const zoomDefault = 18;

/**
 * Default canvas is a featuregroup which will be loaded
 */
const MapableApp = () => {
    //React State Hook Variables
    const [viewport, setViewport] =
        useState(
            {
                center: [latHome, longHome],
                zoom: zoomDefault
            }
        )
    const [canvas, setCanvas] = useState({})

    const handleLoad = () => {
        console.log('Load Button clicked')
        //TODO
        //currently can support autoload if you disable boolLoad in MapComponent
    }

    const handleSave = () => {
        localStorage.setItem('canvas',
            JSON.stringify(canvas))
        console.log('Polygons saved to local system')
    }

    const handleMapData = (fullAddress, metaData) => {
        setViewport(({ center: [metaData.y, metaData.x] }))
    }

    return (
        <div>
            <Header />
            <AddressFinderForm
                handleMapData={handleMapData}
            />
            <ControlButtons
                handleLoad={handleLoad}
                handleSave={handleSave}
            />
            <MapComponent
                animate={true}
                canvas={canvas}
                viewport={viewport}
                onViewportChanged={() => { setViewport(viewport) }}
                onChange={(newCanvas) => { setCanvas(newCanvas) }}
            />
        </div>
    )
}

export default MapableApp