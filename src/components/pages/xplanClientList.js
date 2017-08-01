import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getClients, selectClient } from '../../actions/xplanClientActions';

class ClientList extends Component {
    componentDidMount() {
        this.props.getClients();
    }
    onRowClick(row, columnIndex, rowIndex) {
        //console.log(`You click row ID: ${row.xplanId}, column index: ${columnIndex}, row index: ${rowIndex}`);
        this.props.selectClient(row._id);
    }

    trClassNameFormat(rowData, rIndex) {
        console.log("Selected Check", this.props.selectedClientId, rowData._id);
        if (this.props.selectedClientId === rowData._id) {
            return 'info'
        } else {
            return '';
        }
    }
    render() {
        const selectRow = {
        };
        const options = {
            onRowClick: this.onRowClick.bind(this)
        };

        const clients = this.props.clients;
        return (
            <BootstrapTable 
                options={options}
                data={clients}
                trClassName={this.trClassNameFormat.bind(this)}
                selectRow={selectRow} striped hover>
                <TableHeaderColumn isKey dataField='_id'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

function mapStateToProps(state) {
    return {
        clients: state.xplanClients.clients,
        selectedClientId: state.xplanClients.selectedClientId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);