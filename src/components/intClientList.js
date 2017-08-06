import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn, ButtonGroup, ShowSelectedOnlyButton } from 'react-bootstrap-table';
import { getClients, selectClient, deselectClient, setSelectedClients } from '../actions/clientActions';
import {
    selectClient as selectWfmClient,
    deselectClient as deselectWfmClient,
    setSelectedClients as setSelectedWfmClients
} from '../actions/wfmClientActions';
import {
    selectClient as selectXplanClient,
    deselectClient as deselectXplanClient,
    setSelectedClients as setSelectedXplanClients
} from '../actions/xplanClientActions';
import { extendClientList } from '../selectors/index';

class ClientList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getClients();
    }

    onDelete() {
        alert("DELETE");
    }


    createCustomButtonGroup(props) {

        return (
            <ButtonGroup>
                {props.showSelectedOnlyBtn}
                <a className="btn btn-primary">
                    <i className="fa fa-plus"></i> New</a>
                <a className="btn btn-primary" href={'/client/' + this.props.selectedClientIds[0] + '/edit'}>
                    <i className="fa fa-pencil"></i> Edit</a>
                <a className="btn btn-primary" href={'/client/' + this.props.selectedClientIds[0] + '/bind?'
                    + (this.props.wfmselectedClientIds ? '&wfmId=' + this.props.wfmselectedClientIds[0] : '')
                    + (this.props.xplanselectedClientIds ? '&xplanId=' + this.props.xplanselectedClientIds[0] : '')}>
                    <i className="fa fa-bolt"></i> Bind</a>
                <a className="btn btn-primary" onClick={this.onDelete.bind(this)}>
                    <i className="fa fa-trash"></i> Delete</a>

            </ButtonGroup>
        );
    }

    onRowClick(row, columnIndex, rowIndex) {
        //console.log(`You click row ID: ${row._id}, column index: ${columnIndex}, row index: ${rowIndex}`);
    }

    onSelect(row, isSelected, event) {
        if (isSelected) {
            console.log("You selected row", row);
            this.props.selectClient(row._id);
            this.props.selectWfmClient(row.wfmId);
            this.props.selectXplanClient(row.xplanId);
        } else {
            console.log("You deselected row", row);
            this.props.deselectClient(row._id);
            this.props.deselectWfmClient(row.wfmId);
            this.props.deselectXplanClient(row.xplanId);
        }
        return false;
    }

    onSelectAll(isSelected) {
        if (!isSelected) {
            this.props.setSelectedClients([]);
            this.props.setSelectedWfmClients([]);
            this.props.setSelectedXplanClients([]);
        }
        return false;
    }

    trClassNameFormat(rowData, rIndex) {
        // this.props.selectClientId || rowData._id == this.props.selectClientId
        //console.log("selectedClientIds", this.props.selectedClientIds);
        const selectedClientIds = this.props.selectedClientIds;
        const found = selectedClientIds.find(function (sel) {
            return sel === rowData._id;
        });
        if (found) {
            return 'info'
        } else {
            return '';
        }
    }

    bindFormatter(cell, row) {
        return (
            <div>{cell ? cell : '-'}</div>
        );
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
            showOnlySelected: true,
            clickToSelect: true,
            onSelect: this.onSelect.bind(this),
            onSelectAll: this.onSelectAll.bind(this),
            selected: this.props.selectedClientIds
        };
        const options = {
            onRowClick: this.onRowClick.bind(this),
            btnGroup: this.createCustomButtonGroup.bind(this),

        };

        const clients = this.props.clients;
        return (
            <div>

                <BootstrapTable striped hover
                    search={true}
                    trClassName={this.trClassNameFormat.bind(this)}
                    selectRow={selectRow}
                    options={options}
                    data={clients}
                    pagination>
                    <TableHeaderColumn isKey dataField='_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' dataSort={true}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone' dataSort={true}>Phone</TableHeaderColumn>
                    <TableHeaderColumn dataField='address' hidden>Address</TableHeaderColumn>
                    <TableHeaderColumn dataField='wfmId' hidden></TableHeaderColumn>
                    <TableHeaderColumn dataField='xplanId' hidden></TableHeaderColumn>
                    <TableHeaderColumn dataField='bglId' hidden></TableHeaderColumn>
                    <TableHeaderColumn dataField='binds' width="60" dataAlign="center"
                        dataSort={true}
                        dataFormat={this.bindFormatter.bind(this)}>Binds</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        clients: extendClientList(state),
        selectedClientIds: state.clients.selectedClientIds,
        wfmClients: state.wfmClients.clients,
        wfmselectedClientIds: state.wfmClients.selectedClientIds,
        xplanClients: state.xplanClients.clients,
        xplanselectedClientIds: state.xplanClients.selectedClientIds
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient,
        deselectClient: deselectClient,
        selectWfmClient: selectWfmClient,
        deselectWfmClient: deselectWfmClient,
        selectXplanClient: selectXplanClient,
        deselectXplanClient: deselectXplanClient,
        setSelectedClients: setSelectedClients,
        setSelectedWfmClients: setSelectedWfmClients,
        setSelectedXplanClients: setSelectedXplanClients
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);