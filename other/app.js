import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import 'leaflet-draw';

import 'normalize.css/normalize.css';
import '../src/styles/styles.scss';

/**
 * This version of mappable uses leaflet js instead of react leaflet 
 */

//Contains style overrides to view map window
const Mapable = () => {
    return (
        <div>
            <h1>Welcome to Mapable!</h1>
            <p>Look at this map, isn 't it neat <br />
                Unfortunately this code is incomplete</p>
            <div id="myMap" >
            </div>
        </div>
    )
}

ReactDOM.render(<Mapable />, document.getElementById('app'));

const latLanHome = [-41.294018, 174.777596];
//Map can only be created after the connected map object
const myMap = L.map('myMap').setView(latLanHome, 13);

/*Create a tile layer of which the map will be used
*
 * {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
 * While using any part of OSM it must be an attribution/reference per copyright
 */
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var drawnItems = new L.FeatureGroup();
myMap.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    position: 'topleft',
    draw: {
        marker: true,
        polygon: {
            title: 'Draw a polygon!',
            allowIntersection: false,
            drawError: {
                color: 'red',
                message: 'Don\'t cross the streams!',
                timeout: 1500
            },
            shapeOptions: {
                color: 'green'
            }
        },
        //disable
        circle: false,
        circlemarker: false,
        polyline: false,
        rectangle: false
    },
    edit: {
        featureGroup: drawnItems,
        remove: true
    }
});
myMap.addControl(drawControl);

const marker = L.marker([-41.294018, 174.777596]);
marker.addTo(drawnItems);
marker.bindPopup("Abletech");

myMap.on('draw:created', (e) => {
    if (e.layerType === 'polygon') {
        e.layer.addTo(drawnItems);
    } else if (e.layerType === 'marker') {
        e.layer.addTo(drawnItems);
    }

})