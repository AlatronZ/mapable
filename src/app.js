import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

/*
* {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
* While using any part of OSM it must be an attribution/reference per copyright
*/

const latLanHome = [-41.294018, 174.777596];

class Mapable extends React.Component {
    render (){
        return (
    <div>
        <h1>Welcome to Mapable!</h1>
        <p>Look at this map, isn't it neat <br />
            Unfortunately this code is incomplete</p>
        <Map center={latLanHome} zoom={15} >
            <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                style={{ height: "480px", width: "480px" }}
            >
                <Marker position={latLanHome}>
                    <Popup>Abletech</Popup>
                </Marker>
            </TileLayer>
        </Map>
    </div>
        )}
}

ReactDOM.render(<Mapable />, document.getElementById('app'));

// //Click event handler
// const onMapClick = (e) => {
//     console.log(e);
// }
// myMap.on('click', onMapClick);