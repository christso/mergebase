import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { findClient, updateClient } from '../../actions/clientActions'

class ClientEdit extends Component {
    componentDidMount() {
        this.props.findClient(this.props.match.params.id);
    }

    renderTextField(field) {
        console.log(field);
        //<input className="form-control" name={field.input.name} value={field.input.value} />
        return (
            <div>
                <ControlLabel>{field.label}</ControlLabel>
                <input  className="form-control" type="text"  {...field.input}  name={field.input.name} value={field.input.value}   />
            </div>
        );
    }

    onSubmit(values) {
        alert("you submitted " + JSON.stringify(values));
    }

    handleBroadcast(values) {
        console.log("broadcast", values);
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
                        label="Comment"
                        placeholder="Enter Comment"
                        name="comment"
                        className="form-control"
                        component="input"
                    />
                    <ButtonToolbar>
                        <Button type="submit"
                            bsStyle="primary" disabled={submitting}>Save</Button>
                        <Button type="submit"
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