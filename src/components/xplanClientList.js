import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getClients, selectClient, setFilter } from '../actions/xplanClientActions';
import ReactTable from "react-table";
import { extendXplanClientList } from '../selectors/index';

const makeDefaultState = () => ({
  sorted: [],
  page: 0,
  pageSize: 10,
  expanded: {},
  resized: [],
  filtered: []
});

class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = makeDefaultState();
    }

    componentDidMount() {
        this.props.getClients();
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
                            const bindFilter = "all";
                            {/* console.log("filtered", this.props.filtered); */}
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
                // Controlled props
                sorted={this.state.sorted}
                filtered={this.props.filtered}
                // Callbacks
                onSortedChange={sorted => this.setState({ sorted })}
                onFilteredChange={filtered => {
                    console.log("set filter", filtered);
                    this.props.setFilter(filtered)
                    }}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        clients: extendXplanClientList(state),
        selectedClientIds: state.xplanClients.selectedClients,
        filtered: state.xplanClients.filtered
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient,
        setFilter: setFilter
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);