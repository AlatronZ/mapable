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

class Mapable extends React.Component {
    state = {
        address: '',
        viewport: {
            center: [latHome, longHome],
            zoom: zoomDefault
        }
    }

    searchAddress = (address) => {
        if (!address) { return 'Address was undefined' }
        this.setState(() => ({ address }))
    }

    setMapData = (fullAddress, metaData) => {
        console.log(`New address at ${fullAddress}, Set viewport state to ${metaData.x}, ${metaData.y}`)
        this.setState(() => {
            viewport: {
                center: [metaData.x, metaData.y]
            }
        })
    }

    render() {
        return (
            <div>
                <Header />
                <AddressFinderForm searchAddress={this.searchAddress} setMapData={this.setMapData} />
                <MapComponent viewport={this.state.viewport} />
            </div>
        )
    }
}

ReactDOM.render(<Mapable />, document.getElementById('app'));