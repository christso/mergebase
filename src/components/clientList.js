import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


class ClientList extends Component {
    render() {
        return (
            <div id="content">
            <Table hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Otto, Mark</td>
                        <td>444 444 444</td>
                        <td>120 Epping Rd, North Ryde</td>
                    </tr>
                    <tr>
                        <td>Otto, Mark</td>
                        <td>444 444 444</td>
                        <td>120 Epping Rd, North Ryde</td>
                    </tr>
                    <tr>
                        <td>Otto, Mark</td>
                        <td>444 444 444</td>
                        <td>120 Epping Rd, North Ryde</td>
                    </tr>
                </tbody>
            </Table>
            </div>
        )
    }
}

export default ClientList;