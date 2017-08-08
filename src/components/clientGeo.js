
import React from 'react';
import scriptLoader from 'react-async-script-loader';
import GoogleMap from './googleMap';

class Gmap extends React.Component {

    geoCode() {
        const google = window.google;
        const MarkerClusterer= window.MarkerClusterer;
        
        const geocoder = new google.maps.Geocoder();
        var address = '333 George St Sydney NSW';
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                console.log("Geocode", {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    initMap() {
        const google = window.google;
        const MarkerClusterer= window.MarkerClusterer;

        const positions = [
            { lat: -34.397, lng: 150.644 },
            { lat: -34.497, lng: 150.644 },
            { lat: -34.597, lng: 150.644 },
            { lat: -33.8668461, lng: 151.2068971 }
        ];

        var uluru = { lat: -25.363, lng: 131.044 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });

        var markers = positions.map(function (position, index) {
            return new google.maps.Marker({
                position: position,
                map: map
            })
        });

        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    }

    initEditor() {
        this.geoCode();
        this.initMap();
    }

    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished 
            if (isScriptLoadSucceed) {
                this.initEditor()
            }
            else this.props.onError()
        }
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {

            this.initEditor()
        }
    }

    render() {
        const googleMapProps = {
            key: 'AIzaSyCYdDiyF1_eMx99-djO-A97lQWHGpb9ZvA'
        };

        return (
            <div className="container">
                <div className="row" >
                    <div className="col-xs-12">
                        <h2 className="page-header">Client Geography</h2>
                    </div>
                </div>
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-xs-12">
                        <div className="form-group input-group">
                            <input type="text" className="form-control" 
                                placeholder="Enter a location" defaultValue="333 George St Sydney NSW" />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <GoogleMap {...googleMapProps} />
                    </div>
                </div>
            </div>
        );
    }
}

export default scriptLoader(
    [
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCYdDiyF1_eMx99-djO-A97lQWHGpb9ZvA',
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js'
    ]
)(Gmap);