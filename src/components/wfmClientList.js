import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getClients, selectClient, deselectClient, setWfmFilterItem, setFilter } from '../actions/wfmClientActions'
import ReactTable from "react-table";
import { extendWfmClientList } from '../selectors/index';

const makeDefaultState = () => ({
  sorted: [],
  page: 0,
  pageSize: 10,
  expanded: {},
  resized: [],
  filtered: []
});

class ClientList extends Component {
    constructor() {
        super();
        this.state = makeDefaultState();
    }

    componentDidMount() {
        this.props.getClients();
        //this.props.updateFilter();
    }

    getTrProps(state, rowInfo, column) {
        if (!rowInfo) return {};
        const selectedClientIds = this.props.selectedClientIds;
        const found = selectedClientIds.find(function (sel) {
            return sel === rowInfo.original._id;
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

                const selectedClientIds = this.props.selectedClientIds;
                const found = selectedClientIds.find(function (sel) {
                    return sel === rowInfo.original._id;
                });

                if (found) {
                    this.props.deselectClient(rowInfo.original._id);
                } else {
                    this.props.selectClient(rowInfo.original._id);
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
                        accessor: "_id"
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
                                const selectedClientIds = this.props.selectedClientIds;
                                const foundIndex = selectedClientIds.findIndex(function (sel) {
                                    return sel === row._original._id;
                                });
                                if (foundIndex != -1) return true;
                            }
                            if (filter.value === "bound") {
                                return row[filter.id] > 0;
                            }
                            if (filter.value === "unbound") {
                                return row[filter.id] === 0;
                            }
                        },
                        Filter: ({ filter, onChange }) => {
                            const filtered = this.props.filtered;
                            const bindFilter = filtered.find((item) => item.id === "binds");
                            
                            return (
                                <select
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={bindFilter ? bindFilter.value : "all"}
                                >   
                                    <option value="all">Show All</option>
                                    <option value="selected">Selected</option>
                                    <option value="bound">Bound</option>
                                    <option value="unbound">Unbound</option>
                                </select>
                            )
                        }
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
                filtered={this.props.filtered}
                onFilteredChange={filtered => {
                    this.props.setFilter(filtered);
                    this.setState({filtered});
                    }}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        clients: extendWfmClientList(state),
        selectedClientIds: state.wfmClients.selectedClients,
        filtered: state.wfmClients.filtered
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient,
        deselectClient: deselectClient,
        setFilter: setFilter
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);