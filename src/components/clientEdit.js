import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { findClient, updateClient } from '../actions/clientActions'

class ClientEdit extends Component {
    componentDidMount() {
        this.props.findClient(this.props.match.params.id);
    }

    handleBroadcast(values) {
        alert("Broadcast client " + JSON.stringify(values));
    }

    handleSave(values) {
        this.props.updateClient(values);
        alert("Saved client " + JSON.stringify(values));
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const client = this.props.foundClient;
        return (
            <Well>
                <h2>{client ? client.name : undefined}</h2>
                <form>
                    <div className="form-group has-feedback">
                        <ControlLabel>ID</ControlLabel>
                        <Field
                            className="form-control"
                            label="ID"
                            type="text"
                            placeholder="Enter ID"
                            name="_id"
                            component="input"
                            readOnly />
                    </div>

                    <div className="form-group has-feedback">
                        <ControlLabel>Name</ControlLabel>
                        <Field
                            className="form-control"
                            label="Name"
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            component="input"
                        />
                    </div>

                    <div className="form-group has-feedback">
                        <ControlLabel>Email</ControlLabel>
                        <Field
                            className="form-control"
                            label="Email"
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            component="input"
                        />
                    </div>

                    <div className="form-group has-feedback">
                        <ControlLabel>Phone</ControlLabel>
                        <Field
                            className="form-control"
                            label="Phone"
                            type="text"
                            placeholder="Enter Phone"
                            name="phone"
                            component="input"
                        />
                    </div>

                    <div className="form-group has-feedback">
                        <ControlLabel>Address</ControlLabel>
                        <Field
                            className="form-control"
                            label="Address"
                            type="text"
                            placeholder="Enter Address"
                            name="address"
                            component="input"
                        />
                    </div>

                    <div className="form-group has-feedback">
                        <ControlLabel>Comment</ControlLabel>
                        <Field
                            className="form-control"
                            label="Comment"
                            placeholder="Enter Comment"
                            name="comment"
                            component="textarea"
                        />
                    </div>

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
    form: 'clientEditForm' // a unique identifier for this form
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
        findClient: findClient,
        updateClient: updateClient
    }, dispatch)
}

ClientEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientEdit);

export default ClientEdit;