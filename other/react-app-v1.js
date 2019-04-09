//A formatted version of what the server will save (two polygons data)
const geoJSONDataDummy = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [174.777051, -41.293789],
                    [174.77866, -41.293881],
                    [174.777804, -41.294464],
                    [174.777051, -41.293789]]]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [174.778229, -41.293588],
                    [174.778383, -41.294486],
                    [174.77888, -41.293623],
                    [174.778229, -41.293588]]]
            }
        }
    ]
}


/**
 * This is the mapable app (class implementation) before the refactor to 
 * a functional component with state hooks
 */
export default class MapableApp extends React.Component {
    state = {
        viewport: {
            center: [latHome, longHome],
            zoom: zoomDefault
        },
        canvasLayer: {},
    }

    handleLoad = () => {
        console.log('Load Button clicked')
    }

    updateLoad = () => {
        this.setState(() => ({ load: !load }))
    }

    handleSave = () => {
        localStorage.setItem('canvasLayer',
            JSON.stringify(this.state.canvasLayer))
        console.log('Polygons saved to local system')
    }

    handleMapData = (fullAddress, metaData) => {
        this.setState(() => ({
            viewport: {
                center: [metaData.y, metaData.x]
            }
        }))
    }

    /* 
     * Constantly checks but we use this more specifically to 
        reset the Map viewport when we change it through AddressFinder (handleMapData)
     */
    onViewportChanged = (viewport) => {
        this.setState(() => ({
            viewport
        }))
    }

    onChange = (newCanvas) => {
        // console.log(JSON.stringify(newCanvas))
        this.setState(() => ({ canvasLayer: newCanvas }))
    }

    render() {
        return (
            <div>
                <Header />
                <AddressFinderForm
                    handleMapData={this.handleMapData}
                />
                <ControlButtons
                    handleLoad={this.handleLoad}
                    handleSave={this.handleSave}
                />
                <MapComponent
                    animate={true}
                    geoJSON={this.state.canvasLayer}
                    viewport={this.state.viewport}
                    onViewportChanged={this.onViewportChanged}
                    onChange={this.onChange}
                    updateLoad={this.updateLoad}
                />
            </div>
        )
    }
}