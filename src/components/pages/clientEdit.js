import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, ButtonToolbar } from 'react-bootstrap';
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
                <FormControl type={field.type} {...field.input} readOnly={field.readOnly} placeholder={field.placeholder} />
                <FormControl.Feedback />
            </FormGroup>
        );
    }

    renderTextArea(field) {
        return (
            <FormGroup controlId={field.name}>
                <ControlLabel>{field.label}</ControlLabel>
                <FormControl
                    style={{ height: '100px' }}
                    componentClass="textarea"
                    {...field.input}
                    placeholder={field.placeholder}
                />
            </FormGroup>
        );
    }

    handleBroadcast(values) {
        console.log("broadcast", values);
    }

    handleSave(values) {
        console.log("save", values);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const client = this.props.foundClient;
        return (
            <Well>
                <h2>{client ? client.name : undefined}</h2>
                <form>
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
                    <Field
                        label="Comment"
                        placeholder="Enter Comment"
                        name="comment"
                        component={this.renderTextArea.bind(this)}
                    />
                    <ButtonToolbar>
                        <Button type="submit" onClick={handleSubmit(this.handleSave.bind(this))}
                            bsStyle="primary" disabled={submitting}>Save</Button>
                        <Button type="submit" onClick={handleSubmit(this.handleBroadcast.bind(this))}
                            bsStyle="primary" disabled={submitting}>Broadcast</Button>
                    </ButtonToolbar>
                </form>
            </Well>
        )
    }
}

ClientEdit = reduxForm({
    form: 'clientEditForm', // a unique identifier for this form
    enableReinitialize: true
})(ClientEdit);

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

ClientEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientEdit);

export default ClientEdit;