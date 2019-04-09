import React from 'react';
import { LayersControl, FeatureGroup, Map, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet' //only used within onFeatureGroupReady (L.GeoJSON)

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
    //defaults
    canvas = null
    boolLoad = true

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

    /* FeatureGroup refresh (similar to componentOnMount)
     * ref is a reference to this feature group
     */
    onFeatureGroupReady = (ref) => {
        if (ref == undefined) {
            // console.log('FeatureGroup-ref is undefined')
            return //catches error on first call
        }

        let geoJSONData = this.props.canvas //state canvas
        if (this.boolLoad) {
            //overwrite wth load data if it exists
            try {
                geoJSONData = JSON.parse(localStorage.getItem('canvas'))
                if (geoJSONData == undefined) {
                    throw 'load data not found'
                } else if (JSON.stringify(geoJSONData) == '{}'){
                    //TODO: tidy this case
                    //default state canvas loaded
                    console.log('Be default')
                    geoJSONData = L.featureGroup()
                    console.log(L.featureGroup())
                }
                console.log('Load file found')
            } catch (e) {
                console.log('Load failed:', e)
                geoJSONData = this.props.canvas //set it to default
            }

            /**
             * TODO: - clean up try/catch loop
             *        - assign accurate default value at props.canvas state
             *         - make case for loading an empty saved layer
             * */

            try {
                const leafletGeoJSON = new L.GeoJSON(geoJSONData)
                let featureGroup = ref.leafletElement

                leafletGeoJSON.eachLayer((layer) => {
                    featureGroup.addLayer(layer)
                })
            } catch (e) {
                console.log('unable to read load file')
                //add accountability here otherwise we load a default empty featuregroup
            }

            this.boolLoad = !this.boolLoad
        }

        this.canvas = ref //update canvas
    }

    //called to update prop state after any toolbar action is finished
    onChange = () => {
        if (!this.canvas) {
            console.log('cannot update undefined canvas')
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