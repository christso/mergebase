import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getClients, selectClient } from '../actions/xplanClientActions';
import ReactTable from "react-table";
import "react-table/react-table.css";

class ClientList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getClients();
    }

    trClassNameFormat(rowData, rIndex) {
        // console.log("Selected Check", this.props.selectedClientIds, rowData._id);
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

    getTdProps(state, rowInfo, column, instance) {
        return {
            onClick: (e, handleOriginal) => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)
                if (handleOriginal) {
                    handleOriginal()
                }
            }
        }
    }

    getTrProps(state, rowInfo, column) {
        if (!rowInfo) return {};

        if (rowInfo.original._id === '597ea4538bdccc1394fa8664') {
            return {
                style: {
                    background: 'green'
                }
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
                    }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
                getTdProps={this.getTdProps.bind(this)}
                getTrProps={this.getTrProps.bind(this)}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        clients: state.xplanClients.clients,
        selectedClientIds: state.xplanClients.selectedClientIds,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClient: selectClient
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);