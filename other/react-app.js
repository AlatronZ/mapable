import React from 'react';
import ReactDOM from 'react-dom';
import { LayerGroup, LayersControl, FeatureGroup, Map, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

//import AddressFinder from './AddressFinder-React';

import 'normalize.css/normalize.css';
import '../src/styles/styles.scss';

/*
* This version implements react-leaflet instead of leaflet
* {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
* While using any part of OSM it must be an attribution/reference per copyright
*/

const latLanHome = [-41.294018, 174.777596];
const zoomDefault = 12;

class Mapable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            viewport: {
                center: latLanHome,
                zoom: zoomDefault
            }
        }
    }

    onChangeAddress = (e) => {
        e.persist();
        this.setState(()=>{
            address:e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Welcome to React Mapable!</h1>
                <p>Look at this map, isn't it neat <br />
                    Unfortunately this code is incomplete</p>

                <form>
                    <legend>Put Address Finder here</legend>
                    <input
                        autoFocus
                        type="text"
                        name="address"
                        onChange={this.onChangeAddress}
                        placeholder="Enter an address"
                    />
                    <button>Submit</button>
                </form>

                <Map
                    className="myMap"
                    viewport={this.state.viewport}
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
                        <LayersControl.Overlay name="Home" checked={true}>
                            <LayerGroup>
                                <Marker position={latLanHome}>
                                    <Popup><span>Abletech<br />A fixed marker</span></Popup>
                                </Marker>
                            </LayerGroup>
                        </LayersControl.Overlay>
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
                                        marker: true,

                                        //disabled
                                        circle: false,
                                        circlemarker: false,
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
            </div>
        )
    }
}

ReactDOM.render(<Mapable />, document.getElementById('app'));