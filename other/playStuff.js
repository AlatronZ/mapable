/**
 * JS file of deleted code from original file but kept for reference
 */

//----------Playing with polygons on Map----------
// const polygon1 = L.polygon([
//     [-41.3, 174.8],
//     [-41.32, 174.75],
//     [-41.28, 174.8]
// ], {
//         color: 'red'
//     }).addTo(myMap);
//var popup = L.popup().setLatLng([-41.3, 174.8]).setContent("Coordinate").openOn(myMap);

// const polyLine1 = [[-41.3, 174.8], [-41.32, 174.75], [-41.28, 174.8], [-41.3, 174.8]];
// const polyLine2 = [[-41.27, 174.8], [-41.26, 174.7], [-41.26, 174.6]]
// const multiPoly = [polyLine1, polyLine2];

// let clickList = [];
// const drawPolygon = (e) => {
//     console.log(`Point ${clickList.length}: ${e.latlng}`);
//     clickList = [...clickList, [e.latlng.lat, e.latlng.lng]];
//     //implemented with point limit of 3
//     if (clickList.length >= 3) {
//         console.log('Polygon complete');
//         const polygon2 = L.polygon(clickList, { color: 'purple' }).addTo(myMap);
//         clickList = [];
//     }
// }

//----------Pulled from React App, Home Layer---------
// <LayersControl.Overlay name="Home" checked={true}>
//     <LayerGroup>
//         <Marker position={latLanHome}>
//             <Popup><span>Abletech<br />A fixed marker</span></Popup>
//         </Marker>
//     </LayerGroup>
// </LayersControl.Overlay>