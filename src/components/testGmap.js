
import React from 'react';

const positions = [
    { lat: -34.397, lng: 150.644 },
    { lat: -34.497, lng: 150.644 },
    { lat: -34.597, lng: 151.644 }
];

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

    componentDidMount() {
        this.initMap();
        this.geoCode();
    }

    render() {
        return (
            <div className="map-container">
                <div id='map' ></div>
            </div>
        );
    }
}

export default Gmap;