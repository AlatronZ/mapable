/**
 * a refactored version of Map Component to be functional
 * Scrapped for the favor to access class lifecycle methods 
 */
const MapComponent = (props) => {
    //defaults
    let canvas = null
    let boolLoad = false

    const onCreated = (e) => {
        console.log(`Polygon ${e.layer._leaflet_id} created`)//: ${e.layer._latlngs[0]}`);
        const data = JSON.stringify(e.layer.toGeoJSON())
        // console.log(data);

        onChange() //save changes
    }

    const onEdited = (e) => {
        let edited = 0
        e.layers.eachLayer((layer) => {
            edited += 1
        })
        console.log(`Edited layers: ${edited}`)

        onChange()
    }

    const onDeleted = (e) => {
        let deleted = 0
        e.layers.eachLayer((layer) => {
            deleted += 1
        })
        console.log(`Deleted layers: ${deleted}`)

        onChange()
    }

    /* FeatureGroup refresh (similar to componentOnMount)
     * ref is a reference to this feature group
     */
    const onFeatureGroupReady = (ref) => {
        if (ref == undefined) {
            // console.log('FeatureGroup-ref is undefined')
            return //catches error on first call
        }

        let geoJSONData = props.geoJSONData //state canvas
        console.log(boolLoad)
        if (boolLoad) {
            //overwrite wth load data if it exists
            try {
                geoJSONData = JSON.parse(localStorage.getItem('canvas'))
                if (geoJSONData == undefined) {
                    throw 'load data not found'
                } else if (JSON.stringify(geoJSONData) == '{}') {
                    throw 'load data is empty'
                }
                console.log('Load successful')
            } catch (e) {
                console.log('Load failed:', e)
                geoJSONData = props.geoJSONData
            }
            boolLoad = !boolLoad
            console.log(boolLoad)
        }

        const leafletGeoJSON = new L.GeoJSON(geoJSONData)
        let featureGroup = ref.leafletElement

        leafletGeoJSON.eachLayer((layer) => {
            featureGroup.addLayer(layer)
        })

        canvas = ref //update canvas
    }

    //called to update prop state after any toolbar action is finished
    const onChange = () => {
        if (!canvas) {
            console.log('cannot update undefined canvas')
            return
        }

        const geoJSONData = canvas.leafletElement.toGeoJSON()
        props.onChange(geoJSONData)
    }

    return (
        <Map
            className="myMap"
            viewport={props.viewport}
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
                        ref={(ref) => { onFeatureGroupReady(ref) }}
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

                            onCreated={onCreated}
                            onEdited={onEdited}
                            onDeleted={onDeleted}
                        />
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </Map>
    )
}

export default MapComponent