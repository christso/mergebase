import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


class LoginForm extends Component {
    render() {
        return (
            <Well>
                <Row>
                    <h2>Hello from Login Form</h2>
                </Row>
            </Well>
        )
    }
}

export default LoginForm;