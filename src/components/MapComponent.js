import React from 'react';
import { LayersControl, FeatureGroup, Map, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

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
                    style={{ height: "480px", width: "480px" }}
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