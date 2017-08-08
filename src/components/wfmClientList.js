import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getClients, selectClient, deselectClient } from '../actions/wfmClientActions'
import ReactTable from "react-table";

class ClientList extends Component {
    componentDidMount() {
        this.props.getClients();
    }

    getTrProps(state, rowInfo, column) {
        if (!rowInfo) return {};
        const selectedClients = this.props.selectedClients;
        const found = selectedClients.find(function (sel) {
            return sel.wfmId === rowInfo.original.wfmId;
        });        
        if (found) {
            return {
                className: '-info'
            }
        } else {
            return {};
        }
    }

    render() {
        const clients = this.props.clients;
        return (
            <ReactTable
                data={clients}
                columns={[
                    {
                        Header: "ID",
                        accessor: "wfmId"
                    },
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
                    }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
                getTrProps={this.getTrProps.bind(this)}
            />
        )
    }
}


function mapStateToProps(state) {
    return {
        clients: state.wfmClients.clients,
        selectedClients: state.clients.selectedClients,
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