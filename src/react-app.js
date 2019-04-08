import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import AddressFinderForm from './components/AddressFinderForm';
import MapComponent from './components/MapComponent';

//Leaflet node modules css
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

// import 'normalize.css/normalize.css';
import '../src/styles/styles.scss';

/*
 * This version implements react-leaflet instead of leaflet
 * Likewise react-leaflet-draw to leaflet-draw
 * Leaflets (not react) accessed for their stylesheets
 * React modules look to be independent of their inspired modules
 */

const latHome = -41.294018;
const longHome = 174.777596;
const zoomDefault = 18;

const geoJSONDataDummy = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [174.777051, -41.293789],
                    [174.77866, -41.293881],
                    [174.777804, -41.294464],
                    [174.777051, -41.293789]]]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [174.778229, -41.293588],
                    [174.778383, -41.294486],
                    [174.77888, -41.293623],
                    [174.778229, -41.293588]]]
            }
        }
    ]
}

class Mapable extends React.Component {
    state = {
        viewport: {
            center: [latHome, longHome],
            zoom: zoomDefault
        },
        canvasLayer: {}
    }

    setMapData = (fullAddress, metaData) => {
        this.setState(() => ({
            viewport: {
                center: [metaData.y, metaData.x]
            }
        }))
    }

    onViewportChanged = (viewport) => {
        this.setState(() => ({
            viewport
        }))
    }

    onChange = (newCanvas) => {
        // console.log(JSON.stringify(newCanvas))
        this.setState(() => {
            canvasLayer: JSON.stringify(newCanvas)
        })
        localStorage.setItem('canvasLayer', JSON.stringify(newCanvas))
    }

    render() {
        return (
            <div>
                <Header />
                <AddressFinderForm
                    setMapData={this.setMapData}
                />
                <MapComponent
                    animate={true}
                    viewport={this.state.viewport}
                    onViewportChanged={this.onViewportChanged}
                    onChange={this.onChange}
                    geoJSON={this.state.canvasLayer}
                />
            </div>
        )
    }
}

ReactDOM.render(<Mapable />, document.getElementById('app'));