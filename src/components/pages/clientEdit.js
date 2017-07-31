import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getClients, selectClient } from '../../actions/clientActions'

class ClientEdit extends Component {
    componentDidMount() {
        this.props.getClients();
        this.props.selectClient(this.props.match.params.id);
    }

    handleTemplateChange(arg) {
        console.log("handleTemplateChange", arg);
    }

    render() {
        const clientId = this.props.selectedClientId;
        const client = this.props.clients.filter(function(el) {
                    return el._id == clientId;
                })[0];      
        // console.log("1: Clients = ", this.props.clients);
        // console.log("2: Selectd Client ID = ", this.props.selectedClientId);
        // console.log("3: Selected Client = ", client ? client.name : undefined);

        return (
            <Well>
                <h2>{client ? client.name : undefined}</h2>

                <FormGroup controlId="id">
                    <ControlLabel>ID</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter ID"
                        ref=")id"
                        value={clientId}
                        readOnly />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="name">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Name"
                        ref="name"
                        value={client ? client.name : undefined}
                        onChange={this.handleTemplateChange} />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="email">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Email"
                        ref="email"
                        value={client ? client.email : undefined}
                        onChange={this.handleTemplateChange} />
                    <FormControl.Feedback />
                </FormGroup>         
                <FormGroup controlId="phone">
                    <ControlLabel>Phone</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Phone"
                        ref="phone"
                        value={client ? client.phone : undefined}
                        onChange={this.handleTemplateChange} />
                    <FormControl.Feedback />
                </FormGroup>                                             
                <FormGroup controlId="address">
                    <ControlLabel>Address</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Address"
                        ref="address"
                        value={client ? client.address : undefined}
                        onChange={this.handleTemplateChange} />
                    <FormControl.Feedback />
                </FormGroup>  
                <Button bsStyle="primary">Save</Button>              
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientEdit);