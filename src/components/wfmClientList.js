import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getClients, selectClient } from '../actions/wfmClientActions'

class ClientList extends Component {
    componentDidMount() {
        this.props.getClients();
    }

    onRowClick(row, columnIndex, rowIndex) {
        //console.log(`You click row ID: ${row.wfmId}, column index: ${columnIndex}, row index: ${rowIndex}`);
        this.props.selectClient(row.wfmId);
    }

    trClassNameFormat(rowData, rIndex) {
        console.log("Selected Check", this.props.selectedClientId, rowData.wfmId);
        if (this.props.selectedClientId === rowData.wfmId) {
            return 'info'
        } else {
            return '';
        }
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true
        };
        const options = {
            onRowClick: this.onRowClick.bind(this)
        };

        const clients = this.props.clients;
        return (
            <BootstrapTable striped hover
                trClassName={this.trClassNameFormat.bind(this)}
                selectRow={selectRow}
                options={options}
                data={clients}
                pagination>
                <TableHeaderColumn isKey dataField='wfmId'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}


function mapStateToProps(state) {
    return { 
        clients: state.wfmClients.clients,
        selectedClientId: state.wfmClients.selectedClientId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);