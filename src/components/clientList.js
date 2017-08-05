import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getClients } from '../actions/clientActions';
import InternalClientList from './intClientList';
import WfmClientList from './wfmClientList';
import XplanClientList from './xplanClientList';
import BglClientList from './bglClientList';

const ClientListPanel = (props) => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">{props.panelName}</div>
            <div className="panel-body">
                {props.children}
            </div>
        </div>
    )
}


class ClientList extends Component {
    componentDidMount() {

    }

    render() {



        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <ClientListPanel panelName="INTERNAL">
                        <InternalClientList />
                    </ClientListPanel>
                    <ClientListPanel panelName="Xero Practice Manager">
                        <WfmClientList />
                    </ClientListPanel>
                    <ClientListPanel panelName="IRESS XPLAN">
                        <XplanClientList />
                    </ClientListPanel>                          
                    <ClientListPanel panelName="BGL Simple Fund 360">
                        <BglClientList />
                    </ClientListPanel>                                        
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        clients: state.clients.clients,
        selectedClientId: state.clients.selectedClientId,
        wfmSelectedClientId: state.wfmClients.selectedClientId,
        wfmClients: state.wfmClients.clients,
        xplanClients: state.xplanClients.clients
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);