import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { findClient } from '../../actions/clientActions'

class ClientEdit extends Component {
    componentDidMount() {
        this.props.findClient(this.props.match.params.id);
    }

    renderTextField(field) {
        return (
            <FormGroup controlId={field.name}>
                <ControlLabel>{field.label}</ControlLabel>
                <FormControl type={field.type} {...field.input} readOnly={field.readOnly} />
                <FormControl.Feedback />
            </FormGroup>
        );
    }
    
    onSubmit(values) {
        console.log("Submitted", values);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const client = this.props.foundClient;
        return (
            <Well>
                <h2>{client ? client.name : undefined}</h2>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="ID"
                        type="text"
                        placeholder="Enter ID"
                        name="_id"
                        component={this.renderTextField.bind(this)}
                        readOnly />
        
                    <Field
                        label="Name"
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        component={this.renderTextField.bind(this)}
                        />

                    <Field
                        label="Email"
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        component={this.renderTextField.bind(this)}
                        />
                    <Field
                        label="Phone"
                        type="text"
                        placeholder="Enter Phone"
                        name="phone"
                        component={this.renderTextField.bind(this)}
                        />
                    <Field
                        label="Address"
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        component={this.renderTextField.bind(this)}
                        />
                <Button type="submit" bsStyle="primary" disabled={submitting}>Save</Button>
                </form>
            </Well>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        initialValues: state.clients.foundClient,
        clients: state.clients.clients,
        wfmClients: state.wfmClients.clients,
        xplanClients: state.xplanClients.clients,
        foundClient: state.clients.foundClient
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        findClient: findClient
    }, dispatch)
}

ClientEdit = reduxForm({
    form: 'clientEditForm' // a unique identifier for this form
})(ClientEdit);

ClientEdit = connect(mapStateToProps, mapDispatchToProps)(ClientEdit);

export default ClientEdit;