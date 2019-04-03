import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import SearchForm from './components/SearchForm';
import MapComponent from './components/MapComponent';
//import AddressFinder from './AddressFinder-React';

//Leaflet node modules css
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

// import 'normalize.css/normalize.css';
import '../src/styles/styles.scss';

/*
* This version implements react-leaflet instead of leaflet
* {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
* While using any part of OSM it must be an attribution/reference per copyright
*/

const latLanHome = [-41.294018, 174.777596];
const zoomDefault = 12;

class Mapable extends React.Component {
    state = {
        address: '',
        viewport: {
            center: latLanHome,
            zoom: zoomDefault
        }
    }

    onChangeAddress = (e) => {
            e.persist();
            this.setState(() => {
                address: e.target.value
            })
        }

    render() {
            return (
                <div>
                    <Header />
                    <SearchForm onChangeAddress={this.onChangeAddress} />
                    <MapComponent viewport={this.state.viewport} />
                </div>
            )
        }
    }

    ReactDOM.render(<Mapable />, document.getElementById('app'));