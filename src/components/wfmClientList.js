import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getClients, selectClient, deselectClient } from '../actions/wfmClientActions'

class ClientList extends Component {
    componentDidMount() {
        this.props.getClients();
    }

    onSelect(row, isSelected, event) {
        if (isSelected) {
            console.log("You selected row", row);
            this.props.selectClient(row.wfmId);
        } else {
            console.log("You deselected row", row);
            this.props.deselectClient(row._id);
        }

    }

    trClassNameFormat(rowData, rIndex) {
        const selectedClientIds = this.props.selectedClientIds;
        const found = selectedClientIds.find(function (sel) {
            return sel === rowData.wfmId;
        });
        if (found) {
            return 'info'
        } else {
            return '';
        }
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            showOnlySelected: true
        };
        const options = {
            // onRowClick: this.onRowClick.bind(this)
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
        selectedClientIds: state.wfmClients.selectedClientIds,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient,
        deselectClient: deselectClient
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);