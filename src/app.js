import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
const leafletDraw = require('leaflet-draw');

const Mapable = () => {
    return (
        <div>
            <p>Hello I'm Mapable!</p>
            <div
                id="mapid"
                style={{ height: "480px", width: "480px" }}>
                
            </div>
        </div>
    )
}

ReactDOM.render(<Mapable />, document.getElementById('app'));

//Map can only be created after the connected map object
var myMap = L.map('mapid', { drawControl: true }).setView([-41.294018, 174.777596], 13);

//Create a tile layer of which the map will be used
/*
* {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
* While using any part of OSM it must be an attribution/reference per copyright
*/
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var polygon = L.polygon([
    [-41.0, 1745.0],
    [-20, 1780],
    [-36, 1800]
], {
    color: 'red'
}).addTo(myMap);

//circle works
// var circle = L.circle([-41.294018, 174.777596], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(myMap);

ReactDOM.render(<Mapable />, document.getElementById('app'));