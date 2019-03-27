import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import 'leaflet-draw';

import 'normalize.css/normalize.css';
import '../src/styles/styles.scss';

/**
 * This version of mappable uses leaflet js instead of react leaflet 
 */
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
const zoomDefault = 15;
//Map can only be created after the connected map object
const maxZoom = 18; //OSM breaking point
const minZoom = 5; //All of NZ in 480*480 window

/* Layers
 * {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
 * While using any part of OSM it must be an attribution/reference per copyright
 */
const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
const imageTile = L.tileLayer('/images/MapImage.png');
var drawnMarker = new L.layerGroup();
var drawnItems = new L.FeatureGroup(); //layer to be drawn on

var baseLayers = {
    "Open Street Map": osm,
    "Image": imageTile
};
var overlayLayers = {
    "Home": drawnMarker,
    "Drawn items": drawnItems
}

//Default centre marker
const marker = L.marker(latLanHome).bindPopup("Abletech");
drawnMarker.addLayer(marker);

const myMap = L.map('myMap',
    {
        center: latLanHome,
        keyboardPanDelta: 50,
        layers: [osm, imageTile, drawnMarker, drawnItems],
        maxZoom,
        minZoom,
        zoom: zoomDefault
    });

L.control.layers(baseLayers, overlayLayers).addTo(myMap)

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

//Draw Listener 
myMap.on('draw:created', (e) => {
    if (e.layerType === 'polygon') {
        e.layer.bindPopup('Polygon');
        e.layer.addTo(drawnItems);
    } else if (e.layerType === 'marker') {
        e.layer.bindPopup('Marker')
        e.layer.addTo(drawnItems);
    }
})