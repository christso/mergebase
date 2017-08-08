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
            return sel === rowInfo.original.wfmId;
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

                const selectedClients = this.props.selectedClients;
                const found = selectedClients.find(function (sel) {
                    return sel === rowInfo.original.wfmId;
                });

                if (found) {
                    this.props.deselectClient(rowInfo.original.wfmId);
                } else {
                    this.props.selectClient(rowInfo.original.wfmId);                    
                }
                
                if (handleOriginal) {
                    handleOriginal()
                }
            }
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
                    },
                    {
                        Header: "Binds",
                        accessor: "binds",
                        Cell: row => (
                            row.value === 0 ?
                                <div>-</div>
                                : row.value
                        ),
                        filterMethod: (filter, row) => {
                            if (filter.value === "all") {
                                return true;
                            }
                            if (filter.value === "selected") {
                                const selectedClients = this.props.selectedClients;
                                const found = selectedClients.find(function (sel) {
                                    return sel._id === row._original._id;
                                });
                                if (found) return true;
                            }
                            if (filter.value === "bound") {
                                return row[filter.id] > 0;
                            }
                            if (filter.value === "unbound") {
                                return row[filter.id] === 0;
                            }
                        },
                        Filter: ({ filter, onChange }) => {
                            // value={filter ? filter.value : "all"}
                            return (
                                <select
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : "all"}
                                >
                                    <option value="all">Show All</option>
                                    <option value="selected">Selected</option>
                                    <option value="bound">Bound</option>
                                    <option value="unbound">Unbound</option>
                                </select>
                            )
                        },


                    }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
                getTdProps={this.getTdProps.bind(this)}
                getTrProps={this.getTrProps.bind(this)}
                filterable
                defaultFilterMethod={(filter, row) => {
                    if (String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) >= 0) {
                        return true;
                    }
                    return false;
                }}
            />
        )
    }
}


function mapStateToProps(state) {
    return {
        clients: state.wfmClients.clients,
        selectedClients: state.wfmClients.selectedClients,
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