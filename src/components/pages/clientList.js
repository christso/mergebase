import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getClients } from '../../actions/clientActions'
import InternalClientList from './intClientList';
import WfmClientList from './wfmClientList';
import XplanClientList from './xplanClientList';
import BglClientList from './bglClientList';

class ClientList extends Component {
    componentDidMount() {
        this.props.getClients();
    }
    onAfterSaveCell(row, cellName, cellValue) {
        console.log(`Save cell ${cellName} with value ${cellValue}`);

        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': ' + row[prop] + '\n';
        }

        console.log('update', {
            [cellName]: cellValue
        });
        // console.log('Thw whole row :\n' + rowStr);
    }

    onBeforeSaveCell(row, cellName, cellValue) {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        return true;
    }

    render() {
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell            
        };
        const clients = this.props.clients;
        return (
            <Grid>
                <Row>
                    <h2 className="page-header">DPM Core</h2>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                    <Button bsStyle="primary">New</Button>
                </Row>
                <Row>
                    <InternalClientList />
                </Row>
                <Row>
                    <h2 className="page-header">Xero Practice Manager</h2>
                    <WfmClientList />
                </Row>
                <Row>
                    <h2 className="page-header">IRESS XPLAN</h2>
                    <XplanClientList />
                </Row>    
                <Row>
                    <h2 className="page-header">BGL Simple Fund 360</h2>
                    <BglClientList />
                </Row>                              
            </Grid>
        )
    }
}


function mapStateToProps(state) {
    return { clients: state.wfmClients.clients };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);