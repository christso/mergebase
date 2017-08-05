import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BrowserRouter } from 'react-router-dom';

class ReportList extends Component {
    componentDidMount() {

    }

    dataFormatter(cell) {
        return
        (
            <a href="/clientgeo">{cell}</a>
        )
    }
    onRowClick(row, columnIndex, rowIndex) {
        console.log(`You click row ID: ${row._id}, column index: ${columnIndex}, row index: ${rowIndex}`);
        
    }
    render() {
        const reports = [
            {
                report: 'Client Geography',
                description: 'Show location of clients on a map.',
                url: '/clientgeo'
            },
            {
                report: 'Client Tasks',
                description: 'Follow up on outstanding tasks with clients',
                url: '/clientgeo'
            },
            {
                report: 'Profitability',
                description: 'Analyse profitability of client work',
                url: '/clientgeo'
            }
        ];

        const options = {
            onRowClick: this.onRowClick.bind(this)
        };

        return (
            <div>
                <BootstrapTable striped hover
                    data={reports}
                    options={options}
                    >
                    <TableHeaderColumn isKey dataField='report'
                        dataFormat={cell => {
                            return (
                                <a href="/clientgeo">{cell}</a>)
                        }
                        }>Report</TableHeaderColumn>
                    <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default ReportList;