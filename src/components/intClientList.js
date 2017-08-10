import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import ReactTable from "react-table";
import {
    getClients, selectClient, deselectClient, setSelectedClients,
    toggleSelectClient, chainToggleSelectClient, setBindFilter
} from '../actions/clientActions';
import {
    selectClient as selectWfmClient,
    deselectClient as deselectWfmClient,
    setSelectedClients as setSelectedWfmClients,
    setWfmFilterItem as setWfmFilterItem
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
        this.state = {
            showOnlySelected: false
        };
    }

    componentDidMount() {
        this.props.getClients();
    }

    onDelete() {
        alert("DELETE");
    }


    createCustomButtonGroup(props) {
        const selectedClientIds = this.props.selectedClients.map((sel) => {
            return sel._id;
        })
        // <a className="btn btn-primary" onClick={this.toggleSelectAll.bind(this)}>
        //     <i className="fa fa-star"></i>
        //     {this.state.showOnlySelected ? "  Show Selected" : "  Show All"}</a>
        return (
            <div id="clientList-buttons" className="btn-group btn-group-sm">
                <a className="btn btn-primary">
                    <i className="fa fa-plus"></i> New</a>
                <a className="btn btn-primary" href={'/client/' +
                    (selectedClientIds.length > 0 ? selectedClientIds[0] : undefined) + '/edit'}>
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

    toggleSelectAll() {
        if (this.state.showOnlySelected) {
            this.setState({
                showOnlySelected: false
            });
        } else {
            this.setState({
                showOnlySelected: true
            });
        }
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
                if (rowInfo) {
                    const selectedClients = this.props.selectedClients;
                    const found = selectedClients.find(function (sel) {
                        return sel._id === rowInfo.original._id;
                    });
                    this.props.chainToggleSelectClient(rowInfo.original,
                        found ? false : true);
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
                            ),
                            // this executes on each row
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
                                        onChange={event => {
                                            this.props.setWfmFilterItem("binds", event.target.value);
                                            return onChange(event.target.value)
                                        }
                                        }
                                        style={{ width: "100%" }}
                                        value={filter ? filter.value : "all"}
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
                    getTrProps={this.getTrProps.bind(this)}
                    getTdProps={this.getTdProps.bind(this)}
                    filterable
                    defaultFilterMethod={(filter, row) => {
                        if (String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) >= 0) {
                            return true;
                        }
                        return false;
                    }}


                >
                    {(state, makeTable, instance) => {
                        return (
                            <div>
                                {makeTable()}
                            </div>
                        )

                    }}
                </ReactTable>
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
        toggleSelectClient: toggleSelectClient,
        chainToggleSelectClient: chainToggleSelectClient,
        setBindFilter: setBindFilter,
        setWfmFilterItem: setWfmFilterItem
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);