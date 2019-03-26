import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, Polygon, Polyline, Popup, TileLayer } from 'react-leaflet';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

/*
* This version implements react-leaflet 
* {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
* While using any part of OSM it must be an attribution/reference per copyright
*/

const latLanHome = [-41.294018, 174.777596];

const polyLine1 = [[-41.3, 174.8], [-41.32, 174.75], [-41.28, 174.8], [-41.3, 174.8]];
const polyLine2 = [[-41.27, 174.8], [-41.26, 174.7], [-41.26, 174.6]]
const multiPoly = [polyLine1, polyLine2];

class Mapable extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to React Mapable!</h1>
                <p>Look at this map, isn't it neat <br />
                    Unfortunately this code is incomplete</p>
                <Map 
                    center={latLanHome}
                    zoom={12}
                >
                    <TileLayer
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        style={{ height: "480px", width: "480px" }}
                    />
                        <Polyline color="lime" positions={polyLine1} />
                        <Polygon color="purple" positions={polyLine2} />
                        <Marker position={latLanHome}>
                            <Popup>Abletech</Popup>
                        </Marker>
                    
                </Map>
            </div>
        )
    }
}

ReactDOM.render(<Mapable />, document.getElementById('app'));

// //Click event handler
// const onMapClick = (e) => {
//     console.log(e);
// }
// myMap.on('click', onMapClick);