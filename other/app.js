import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

/**
 * This version of mappable uses leaflet js instead of react leaflet 
 */

//Contains style overrides
const Mapable = () => {
    return (
        <div>
            <h1>Welcome to Mapable!</h1>
            <p>Look at this map, isn't it neat <br />
                Unfortunately this code is incomplete</p>
            <div
                id="mapid"
                style={{ height: "480px", width: "480px" }}>
            </div>
        </div>
    )
}

ReactDOM.render(<Mapable />, document.getElementById('app'));

const latLanHome = [-41.294018, 174.777596];
//Map can only be created after the connected map object
const myMap = L.map('mapid').setView(latLanHome, 13);

//Create a tile layer of which the map will be used
/*
* {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
* While using any part of OSM it must be an attribution/reference per copyright
*/
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

/*
 * Later test for addressfinder tile layers
 */
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

/* Using an image test
* It works but needs a large enough image or it literally tile layers
Could then add conditions of max/min zoom
// */
// L.tileLayer('/images/MapImage.png').addTo(myMap);

const polygon1 = L.polygon([
    [-41.3, 174.8],
    [-41.32, 174.75],
    [-41.28, 174.8]
], {
        color: 'red'
    }).addTo(myMap);

let clickList = [];

//potential future use
const marker = L.marker([-41.294018, 174.777596]);
marker.addTo(myMap);
marker.bindPopup("Abletech");

var popup = L.popup().setLatLng([-41.3, 174.8]).setContent("Coordinate").openOn(myMap);

//Click event handler
const onMapClick = (e) => {
    //need a toolbar or set point limit
    console.log(`Point ${clickList.length}: ${e.latlng}`);
    clickList = [...clickList, [e.latlng.lat, e.latlng.lng]];
    //implemented with point limit of 3
    if (clickList.length >= 3) {
        console.log('Polygon complete');
        const polygon2 = L.polygon(clickList, { color: 'purple' }).addTo(myMap);
        clickList = [];
    }
}
myMap.on('click', onMapClick);