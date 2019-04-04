import React from 'react';
import { LayersControl, FeatureGroup, Map, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

/*
* {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
* While using the base layers they must be correctly attributed per use
*/
const MapComponent = (props) => (
    <Map
        className="myMap"
        viewport={props.viewport}
    >
        <LayersControl position="topright">
            <LayersControl.BaseLayer name="OpenStreetMap" checked={true}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="LINZ">
                <TileLayer
                    url="http://tiles-{s}.data-cdn.linz.govt.nz/services;key=2661fdc42a6941e7aba3f8d9cb81eed1/tiles/v4/set=4702/EPSG:3857/{z}/{x}/{y}.png"
                    attribution="<a href=“http://data.linz.govt.nz”>Sourced from LINZ. CC BY 4.0</a>"
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Theraputic">
                <TileLayer
                    url="../images/floof.jpg"
                    attribution="Tiled Image"

                />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay name="Draw Canvas" checked={true}>
                <FeatureGroup color="green">
                    <EditControl
                        position='topleft'
                        draw={{
                            polygon: {
                                allowIntersection: false,
                                title: 'doodleDo',
                                drawError: {
                                    color: 'red',
                                    message: 'Don\'t cross the streams!',
                                    timeout: 1500
                                },
                                shapeOptions: {
                                    color: 'green'
                                }
                            },

                            //disabled tools
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polyline: false,
                            rectangle: false
                        }}
                    // edit={{
                    //     remove: true
                    // }}
                    />
                </FeatureGroup>
            </LayersControl.Overlay>
        </LayersControl>
    </Map>
)

export default MapComponent