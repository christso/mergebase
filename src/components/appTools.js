import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BrowserRouter, Redirect } from 'react-router-dom';

const tools = [
    {
        name: "Data Merge",
        description: "Merge differences between data sources.",
        url: '/merge'
    },    
    {
        name: 'Client Geography',
        description: 'Show location of clients on a map.',
        url: '/clientgeo'
    },
    {
        name: 'WIP',
        description: 'Follow up on outstanding work with clients',
        url: '/wip'
    },
    {
        name: 'Profitability',
        description: 'Analyse profitability of client work',
        url: '/profitability'
    }
];

class ReportList extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {

    }

    dataFormatter(cell) {
        return
        (
            <a href="/clientgeo">{cell}</a>
        )
    }
    onRowClick(row, columnIndex, rowIndex) {
        //console.log(`You click row ID: ${row._id}, column index: ${columnIndex}, row index: ${rowIndex}`);
        //console.log("Navigate to " + row.url);
        this.setState({
            redirect: true,
            redirectUrl: row.url
        });
    }

    trClassNameFormat(rowData, rIndex) {
        return "cursor-pointer";
    }

    render() {
        const options = {
            onRowClick: this.onRowClick.bind(this)
        };

        if (this.state.redirect) {
            return <Redirect to={this.state.redirectUrl} />
        } else {
            return (
                <div>
                    <BootstrapTable striped hover
                        data={tools}
                        options={options}
                        trClassName={this.trClassNameFormat.bind(this)}
                    >
                        <TableHeaderColumn isKey dataField='name'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }
    }
}

export default ReportList;