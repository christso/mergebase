import React from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'en'
        };

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <div id="page-content" className="row">

                    <h2>Geolocator Examples</h2>
                    <hr />
                    <h3>Geolocator Configuration</h3>

                    <div className="well form-horizontal">
                        <div className="form-group">
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <span className="input-group-addon mw-120">Language</span>
                                    <select id="sel-lang" className="form-control" value={this.state.value} onChange={this.handleChange.bind(this)}>
                                        <option value='en'>English</option>
                                        <option value='fr'>French</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon mw-120">HTTPS</span>
                                    <input id="chk-config-https" type="checkbox" defaultChecked />
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="input-group">
                                    <span className="input-group-addon mw-170">Google API Key</span>
                                    <input id="txt-config-gk" type="password" className="form-control" placeholder="" defaultValue="AIzaSyCYdDiyF1_eMx99-djO-A97lQWHGpb9ZvA"
                                    />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon mw-170">Google Maps Version</span>
                                    <input id="txt-config-gversion" type="text" className="form-control" placeholder="Google Maps Version" defaultValue="3" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="menu-content">
                        <div className="menu-panel active" id="panel-geocode">
                            <h3>Geocoding — Coordinates from Address</h3>
                            <div className="well form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <div className="input-group">
                                            <span className="input-group-addon mw-160">Address</span>
                                            <input id="txt-geocode-address" type="text" className="form-control" placeholder="Address" defaultValue="1600 Amphitheatre Parkway, CA" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <button id="btn-exec" type="button" className="btn btn-success btn-block">Locate (HTML5)</button>
                    <br />
                    <div id="map-canvas"></div>
                </div>
            </div>
        );
    }
}

export default Test;