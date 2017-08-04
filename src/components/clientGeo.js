
import React from 'react';
import scriptLoader from 'react-async-script-loader';
import GoogleMap from './googleMap';

class Gmap extends React.Component {

    geoCode() {
        const geocoder = new google.maps.Geocoder();
        var address = '190 Beecroft Road';
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                console.log("Geocode", results);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    initMap() {

        const positions = [
            { lat: -34.397, lng: 150.644 },
            { lat: -34.497, lng: 150.644 },
            { lat: -34.597, lng: 151.644 }
        ];

        var markers = [];

        var uluru = { lat: -25.363, lng: 131.044 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });

        positions.map(function (position, index) {
            return new google.maps.Marker({
                position: position,
                map: map
            })
        });
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
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCYdDiyF1_eMx99-djO-A97lQWHGpb9ZvA'
    ]
)(Gmap);