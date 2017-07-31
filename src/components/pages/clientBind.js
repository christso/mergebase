import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getClients, selectClient } from '../../actions/clientActions'
import { Field, reduxForm } from 'redux-form'

class ClientBind extends Component {
    componentDidMount() {
        const res1 = this.props.getClients();
        console.log("0: Clients = ", this.props.clients, res1);
        this.props.selectClient(this.props.match.params.id);
        console.log("2: Select Client = ", this.props.selectClient);
    }


    handleTemplateChange(arg) {
        console.log("handleTemplateChange", arg);
    }


    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const clientId = this.props.match.params.id;
        const client = this.props.clients.filter(function (el) {
            return el._id == clientId;
        })[0];
        return (
           <Well>
                <h2>{client ? client.name : undefined}</h2>

                <FormGroup controlId="id">
                    <ControlLabel>ID</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter ID"
                        ref="id"
                        defaultValue={clientId}
                        readOnly />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="wfmId">
                    <ControlLabel>WFM ID</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter ID"
                        ref="_id"
                        value={client ? client.wfmId : undefined}/>
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="xplanId">
                    <ControlLabel>XPLAN ID</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter ID"
                        ref="id"
                        value={client ? client.xplanId : undefined}/>
                    <FormControl.Feedback />
                </FormGroup>                                
                <FormGroup controlId="bglId">
                    <ControlLabel>BGL ID</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter ID"
                        ref="name"
                        value={client ? client.bglId : undefined}
                        onChange={this.handleTemplateChange} />
                    <FormControl.Feedback />
                </FormGroup>
                <Button bsStyle="primary">Bind</Button>      
            </Well>
        )
    }
}
function mapStateToProps(state, props) {
    return {
        clients: state.clients.clients,
        wfmClients: state.wfmClients.clients,
        xplanClients: state.xplanClients.clients,
        selectedClientId: state.clients.selectedClientId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient
    }, dispatch)
}

export default reduxForm({
    form: 'simple' // a unique identifier for this form
})(connect(mapStateToProps, mapDispatchToProps)(ClientBind))
