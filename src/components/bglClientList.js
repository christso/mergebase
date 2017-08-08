import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getBglClients } from '../actions/bglClientActions';
import ReactTable from "react-table";

class ClientList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getClients();
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
            />
        )
    }
}


function mapStateToProps(state) {
    return { clients: state.bglClients.clients };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getBglClients
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);