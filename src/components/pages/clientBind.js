import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import queryString  from 'query-string';
import { findClient, prefillClient } from '../../actions/clientActions'

class ClientBind extends Component {
    componentDidMount() {
        const newValues = queryString.parse(this.props.location.search);
        this.props.findClient(this.props.match.params.id, newValues);           
    }

    renderTextField(field) {
        return (
        <FormGroup controlId={field.name}>
            <ControlLabel>{field.label}</ControlLabel>
            <FormControl type={field.type} defaultValue={field.input.value} readOnly={field.readOnly} />
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
                        name="_id"
                        label="ID"                        
                        type="text"
                        placeholder="ID"
                        readOnly
                        component={this.renderTextField.bind(this)}
                    />
                    <Field
                        name="wfmId"
                        label="WFM ID"
                        type="text"
                        placeholder="Enter ID"
                        component={this.renderTextField.bind(this)}
                    />
                    <Field
                        name="xplanId"
                        label="XPLAN ID"
                        type="text"
                        placeholder="Enter ID"
                        component={this.renderTextField.bind(this)}
                    />
                    <Button type="submit" bsStyle="primary" disabled={submitting}>
                        Bind
                    </Button>
                </form>
            </Well>
        )
    }

}

ClientBind = reduxForm({
    form: 'clientBindForm'
})(ClientBind);

function mapStateToProps(state, props) {
    return {
        initialValues: state.clients.foundClient,
        clients: state.clients.clients,
        foundClient: state.clients.foundClient
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        findClient: findClient
    }, dispatch)
}

// You have to connect() to any reducers that you wish to connect to yourself
ClientBind = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientBind)

export default ClientBind;