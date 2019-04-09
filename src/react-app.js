import React from 'react';
import ReactDOM from 'react-dom';
import MapableApp from './components/MapableApp';

//Leaflet node modules css
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

// import 'normalize.css/normalize.css';
import '../src/styles/styles.scss';

/*
 * This version implements react-leaflet & react-leaflet-draw 
    instead of leaflet & leaflet-draw respectively
 * Leaflet modules are accessed for their stylesheets
 * React modules look to be independent of their inspired modules with less functionality
 * 
 */

ReactDOM.render(<MapableApp />, document.getElementById('app'));