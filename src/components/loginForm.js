import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {setLoginStatus} from '../actions/appActions';

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
    componentDidMount() {
        this.props.setLoginStatus(() => false);
        // console.log("Logged In", this.props.isLoggedIn);
    }

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
                        <h3 style={{textAlign: 'center'}}>Welcome to Diversified Practice Manager</h3>
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

function mapStateToProps(state) {
    return {
        isLoggedIn: state.app.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setLoginStatus: setLoginStatus
    }, dispatch)
}

LoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginForm;