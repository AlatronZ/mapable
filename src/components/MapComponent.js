import React from 'react';
import { LayersControl, FeatureGroup, Map, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet'

/*
* {s} subdomain, {z} zoom, {x}{y} coordinates, {r}(optional) load retina tiles
* While using the base layers they must be correctly attributed per use
*/
const urlOSM = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
const urlLINZ = "http://tiles-{s}.data-cdn.linz.govt.nz/services;key=2661fdc42a6941e7aba3f8d9cb81eed1/tiles/v4/set=4702/EPSG:3857/{z}/{x}/{y}.png"
const urlImage = "../images/floof.jpg"

const attrOSM = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
const attrLINZ = "<a href=“http://data.linz.govt.nz”>Sourced from LINZ. CC BY 4.0</a>"

class MapComponent extends React.Component {
    canvas = null //default

    onCreated = (e) => {
        console.log(`Polygon ${e.layer._leaflet_id} created`)//: ${e.layer._latlngs[0]}`);
        const data = JSON.stringify(e.layer.toGeoJSON())
        // console.log(data);

        this.onChange() //save changes
    }

    onEdited = (e) => {
        let edited = 0
        e.layers.eachLayer((layer) => {
            edited += 1
        })
        console.log(`Edited layers: ${edited}`)

        this.onChange()
    }

    onDeleted = (e) => {
        let deleted = 0
        e.layers.eachLayer((layer) => {
            deleted += 1
        })
        console.log(`Deleted layers: ${deleted}`)

        this.onChange()
    }

    /*load function
     * ref is a reference to the feature group
     * ref === this.map.layercontrol-overlay.featuregroup
     */
    onFeatureGroupReady = (ref) => {
        if (ref == undefined) {
            console.log('FeatureGroup-ref is undefined')
            return
        }

        let geoJSONData
        try {
            geoJSONData = JSON.parse(localStorage.getItem('canvasLayer'))
        } catch (e) {
            console.log('Load failed')
            return
        }

        const leafletGeoJSON = new L.GeoJSON(geoJSONData)
        let featureGroup = ref.leafletElement

        leafletGeoJSON.eachLayer((layer) => {
            featureGroup.addLayer(layer)
        })

        this.canvas = ref
        console.log('Load successful')
    }

    //called to save after any toolbar action is finished
    onChange = () => {
        if (!this.canvas) {
            console.log('cannot save undefined canvas')
            return
        }

        const geoJSONData = this.canvas.leafletElement.toGeoJSON()
        this.props.onChange(geoJSONData)
    }

    render() {
        return (
            <Map
                className="myMap"
                viewport={this.props.viewport}
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="OpenStreetMap" checked={true}>
                        <TileLayer
                            url={urlOSM}
                            attribution={attrOSM}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="LINZ">
                        <TileLayer
                            url={urlLINZ}
                            attribution={attrLINZ}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Theraputic">
                        <TileLayer
                            url={urlImage}
                            attribution="Tiled Image"

                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay
                        name="Draw Canvas"
                        checked={true}
                    >
                        <FeatureGroup
                            ref={(ref) => { this.onFeatureGroupReady(ref) }}
                        >
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
                                onCreated={this.onCreated}
                                onEdited={this.onEdited}
                                onDeleted={this.onDeleted}
                            />
                        </FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </Map>
        )
    }
}

export default MapComponent