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