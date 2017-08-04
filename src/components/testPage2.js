/* global google */

import Helmet from "react-helmet";
import geocoder from 'google-geocoder';
import { default as MarkerClusterer } from "react-google-maps/lib/addons/MarkerClusterer";

import {
    default as React,
    Component,
} from "react";

import {
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

function renderMarkers() {
    return positions.map(function (position, index) {
        return (
            <Marker
                key={index}
                defaultPosition={position}
                title="Click to zoom"
            />
        )
    });
}

function renderMarker() {
    return (
        <div>
            <Marker key={1}
                defaultPosition={{ lat: -34.397, lng: 150.644 }}
                title="Click to zoom"
            />
            <Marker key={2}
                defaultPosition={{ lat: -34.497, lng: 150.644 }}
                title="Click to zoom"
            />
            <Marker key={3}
                defaultPosition={{ lat: -34.597, lng: 150.644 }}
                title="Click to zoom"
            />
        </div>
    )
}

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {renderMarkers()}
        </MarkerClusterer>
    </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class SimpleMapExample extends Component {

    render() {
        return (
            <SimpleMapExampleGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />

        );
    }
}

export default class MapWrapper extends Component {
    componentDidMount() {
        this.geocode();
    }

    geocode() {

        const positions = [
            { lat: -34.397, lng: 150.644 },
            { lat: -34.497, lng: 150.644 },
            { lat: -34.597, lng: 151.644 }
        ];

        var geo = geocoder({
            key: 'AIzaSyCYdDiyF1_eMx99-djO-A97lQWHGpb9ZvA'
        });

        geo.find('190 Beecroft Rd Cheltenham', function (err, res) {

            // process response object 
            console.log("GEO FIND", res);
        });

    }

    render() {
        return (
            <div className="container">
                <div className="row" >
                    <div className="col-xs-12">
                        <h2 className="page-header">Client Geography v2</h2>
                    </div>
                </div>
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-xs-12">
                        <div className="form-group input-group">
                            <input type="text" className="form-control" placeholder="Enter a location" />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12" style={{ height: `500px` }}>
                        <SimpleMapExample />
                    </div>
                </div>
            </div>
        );
    }
}