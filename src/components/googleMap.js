import React, { Component } from 'react';
import ReactDOM from 'react-dom'

// // Ensure you specify an absolute height for your map in your style.css
// #map {
// height: 400px;
// width: 100%;
// }

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 * Alternatively, use react-async-script-loader
 */
export default class GoogleMap extends Component {
    render() {
        return (
            <div className="map-container">
                <div id='map' ></div>
            </div>
        );
    }
}
