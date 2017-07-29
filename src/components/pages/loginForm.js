import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class LoginForm extends Component {
    onSubmit() {
        console.log("YOU PRESSED SUBMIT");
    }

    render() {
        return (
            <Row style={{ marginTop: '150px' }}>
                <Col xs={0} sm={4}>
                </Col>

                <Col xs={12} sm={4}>
                    <Panel>
                        <h3 style={{textAlign: 'center'}}>Welcome to Practice Integrator</h3>
                        <br />
                        <FieldGroup
                            id="formControlsEmail"
                            type="email"
                            label="Email address"
                            placeholder="Enter email"
                        />
                        <FieldGroup
                            id="formControlsPassword"
                            label="Password"
                            type="password"
                        />
                        <Button bsStyle="primary" href="/clients">
                            Login
                        </Button>
                    </Panel>
                </Col>
                <Col xs={0} sm={4}>
                </Col>
            </Row>
        )
    }
}

export default LoginForm;