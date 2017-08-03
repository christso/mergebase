import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Map, { Marker, GoogleApiWrapper } from 'google-maps-react'

const markers = [
    {
        title: 'The marker`s title will appear as a tooltip.',
        name: '333 George St',
        position: { lat: -33.8668183, lng: 151.20687210000006 }
    },
    {
        title: 'The marker`s title will appear as a tooltip.',
        name: '1 Epping',
        position: { lat: -33.7965476, lng: 151.13836879999997 }
    },
    {
        title: 'The marker`s title will appear as a tooltip.',
        name: '1 Chatswood Avenue, Chatswood, New South Wales, Australia',
        position: { lat: -33.793318, lng: 151.19086059999995 }
    }
];

class Contents extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return {
            place: null,
            position: null
        }
    }

    onSubmit(e) {
        e.preventDefault();
    }

    componentDidMount() {
        this.renderAutoComplete();
    }

    componentDidUpdate(prevProps) {
        const { google, map } = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    }

    renderMarkers(data) {
        data.map(function (el) {
            return (
                <Marker
                    title={el.title}
                    name={el.name}
                    position={el.position} />
            )
        })
    }

    renderAutoComplete() {
        const { google, map } = this.props;

        if (!google || !map) return;

        const aref = this.refs.autocomplete;
        const node = ReactDOM.findDOMNode(aref);
        var autocomplete = new google.maps.places.Autocomplete(node);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            this.setState({
                place: place,
                position: place.geometry.location
            })
        })
    }

    render() {
        const props = this.props;
        const { position } = this.state;

        return (
            <div className="container">
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-xs-12">
                        <h2>Client Geography</h2>
                    </div>
                </div>
                <div className="row" style={{ marginBottom: "15px" }}>
                    <div className="col-xs-8">
                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-xs-10">
                                    <input
                                        className="form-control"
                                        ref='autocomplete'
                                        type="text"
                                        placeholder="Enter a location" />
                                </div>
                                <div className="col=xs-2">
                                    <input
                                        className="btn btn-default"
                                        type='submit'
                                        value='Go' />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-xs-4">
                        <div>Lat: {position && position.lat()}</div>
                        <div>Lng: {position && position.lng()}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Map {...props}
                            containerStyle={{
                                position: 'relative',
                                height: '100vh',
                                width: '100%'
                            }}
                            center={this.state.position}
                            centerAroundCurrentLocation={false}>
                            <Marker position={this.state.position} />
                            <Marker
                                title={'The marker`s title will appear as a tooltip.'}
                                name={'333 George St'}
                                position={{ lat: -33.8668183, lng: 151.20687210000006 }} />
                            <Marker
                                title={'The marker`s title will appear as a tooltip.'}
                                name={'1 Epping'}
                                position={{ lat: -33.7965476, lng: 151.13836879999997 }} />
                            <Marker
                                title={'The marker`s title will appear as a tooltip.'}
                                name={'1 Chatswood Avenue, Chatswood, New South Wales, Australia'}
                                position={{ lat: -33.793318, lng: 151.19086059999995 }} />
                        </Map>
                    </div>
                </div>
            </div>
        )
    }
}

class MapWrapper extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const props = this.props;
        const { google } = this.props;
        return (
            <Map google={google}
                className={'map'}
                visible={false}>
                <Contents {...props} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCYdDiyF1_eMx99-djO-A97lQWHGpb9ZvA'
})(MapWrapper)
