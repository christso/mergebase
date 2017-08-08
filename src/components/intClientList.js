import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import ReactTable from "react-table";
import { getClients, selectClient, deselectClient, setSelectedClients,
    toggleSelectClient } from '../actions/clientActions';
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
            <div id="clientList-buttons" className="btn-group btn-group-sm">
                <a className="btn btn-primary">
                    <i className="fa fa-star"></i> Show Selected</a>
                <a className="btn btn-primary">
                    <i className="fa fa-plus"></i> New</a>
                <a className="btn btn-primary" href={'/client/' + this.props.selectedClients + '/edit'}>
                    <i className="fa fa-pencil"></i> Edit</a>
                <a className="btn btn-primary" href={'/client/' + this.props.selectedClients + '/bind?'
                    + (this.props.wfmselectedClients + '&wfmId=' + this.props.wfmselectedClients + '')
                    + (this.props.xplanselectedClients + '&xplanId=' + this.props.xplanselectedClients + '')}>
                    <i className="fa fa-bolt"></i> Bind</a>
                <a className="btn btn-primary" onClick={this.onDelete.bind(this)}>
                    <i className="fa fa-trash"></i> Delete</a>

            </div>
        );
    }

    getTrProps(state, rowInfo, column) {
        if (!rowInfo) return {};
        const selectedClients = this.props.selectedClients;
        const found = selectedClients.find(function (sel) {
            return sel._id === rowInfo.original._id;
        });        
        if (found) {
            return {
                className: '-info'
            }
        } else {
            return {};
        }
    }    

    getTdProps(state, rowInfo, column, instance) {
        return {
            onClick: (e, handleOriginal) => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)
                
                if (column.Header === "Binds") {
                    this.props.toggleSelectClient(rowInfo.original);
                }
                
                if (handleOriginal) {
                    handleOriginal()
                }
            }
        }
    }

    bindFormatter(cell, row) {
        return (
            <div>{cell ? cell : '-'}</div>
        );
    }

    render() {
        const clients = this.props.clients;
        return (
            <div>
                {this.createCustomButtonGroup()}
                <ReactTable
                    data={clients}
                    columns={[
                        {
                            Header: "Name",
                            accessor: "name"
                        },
                        {
                            Header: "Email",
                            accessor: "email"
                        },
                        {
                            Header: "Phone",
                            accessor: "phone"
                        },
                        {
                            Header: "Binds",
                            accessor: "binds",
                            Cell: row => (
                                    row.value === 0 ?
                                        <div>-</div>
                                        : row.value
                                )
                        }
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    getTrProps={this.getTrProps.bind(this)}
                    getTdProps={this.getTdProps.bind(this)}
                    filterable
                    defaultFilterMethod={(filter, row) => {
                        if (String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) >= 0) {
                            return true;
                        }
                        return false;
                    }}
                        
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        clients: extendClientList(state),
        selectedClients: state.clients.selectedClients,
        wfmClients: state.wfmClients.clients,
        wfmselectedClients: state.wfmClients.selectedClients,
        xplanClients: state.xplanClients.clients,
        xplanselectedClients: state.xplanClients.selectedClients
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
        setSelectedXplanClients: setSelectedXplanClients,
        toggleSelectClient: toggleSelectClient
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);