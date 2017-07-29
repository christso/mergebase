import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class ClientEdit extends Component {
    render() {
        return (
            <Well>
                <FormGroup controlId="id">
                    <ControlLabel>ID</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter ID"
                        ref="id" />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="name">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Name"
                        ref="name" />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="email">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Email"
                        ref="email" />
                    <FormControl.Feedback />
                </FormGroup>                        
                <FormGroup controlId="address">
                    <ControlLabel>Address</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Address"
                        ref="address" />
                    <FormControl.Feedback />
                </FormGroup>                
            </Well>
        )
    }
}

export default ClientEdit;