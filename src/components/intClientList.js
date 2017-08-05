import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getClients, selectClient } from '../actions/clientActions';
import { selectClient as selectWfmClient } from '../actions/wfmClientActions';
import { selectClient as selectXplanClient } from '../actions/xplanClientActions'

class ClientList extends Component {
    componentDidMount() {
        this.props.getClients();
    }

    onDelete() {
        alert("DELETE");
    }

    createCustomButtonGroup() {

        return (
            <div id="clientList-buttons" className="btn-group">
                <a className="btn btn-default">
                    <i className="fa fa-plus"></i> New</a>
                <a className="btn btn-default" href={'/client/' + this.props.selectedClientId + '/edit'}>
                    <i className="fa fa-pencil"></i> Edit</a>
                <a className="btn btn-default" href={'/client/' + this.props.selectedClientId + '/bind?'
                    + (this.props.wfmSelectedClientId ? '&wfmId=' + this.props.wfmSelectedClientId : '')
                    + (this.props.xplanSelectedClientId ? '&xplanId=' + this.props.xplanSelectedClientId : '')}>
                    <i className="fa fa-bolt"></i> Bind</a>
                <a className="btn btn-default" onClick={this.onDelete.bind(this)}>
                    <i className="fa fa-trash"></i> Delete</a>
            </div>
        );
    }

    onRowClick(row, columnIndex, rowIndex) {
        //console.log(`You click row ID: ${row._id}, column index: ${columnIndex}, row index: ${rowIndex}`);
        this.props.selectClient(row._id);
        this.props.selectWfmClient(row.wfmId);
        this.props.selectXplanClient(row.xplanId);
    }

    trClassNameFormat(rowData, rIndex) {
        // this.props.selectClientId || rowData._id == this.props.selectClientId
        //console.log("selectedClientId", this.props.selectedClientId);
        if (this.props.selectedClientId === rowData._id) {
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
            // btnGroup: this.createCustomButtonGroup.bind(this),
            onRowClick: this.onRowClick.bind(this),
        };

        const clients = this.props.clients;
        return (
            <div>
                {this.createCustomButtonGroup()}
                <BootstrapTable striped hover
                    trClassName={this.trClassNameFormat.bind(this)}
                    selectRow={selectRow}
                    options={options}
                    data={clients}
                    pagination>
                    <TableHeaderColumn isKey dataField='_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        clients: state.clients.clients,
        selectedClientId: state.clients.selectedClientId,
        wfmClients: state.wfmClients.clients,
        wfmSelectedClientId: state.wfmClients.selectedClientId,
        xplanClients: state.xplanClients.clients,
        xplanSelectedClientId: state.xplanClients.selectedClientId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient,
        selectWfmClient: selectWfmClient,
        selectXplanClient: selectXplanClient
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);