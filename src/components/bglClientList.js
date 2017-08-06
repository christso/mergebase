import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getBglClients } from '../actions/bglClientActions';

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
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            showOnlySelected: true            
        };        
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell            
        };
        const clients = this.props.clients;
        return (
            <BootstrapTable data={clients} selectRow={selectRow}
                striped hover cellEdit={cellEditProp}>
                <TableHeaderColumn isKey dataField='bglId' hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}


function mapStateToProps(state) {
    return { clients: state.bglClients.clients };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getBglClients
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);