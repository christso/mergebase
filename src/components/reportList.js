import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Route } from 'react-router-dom';

class ReportList extends Component {
    componentDidMount() {

    }

    dataFormatter(cell) {
        return
        (
            <a href="/clientgeo">{cell}</a>
        )
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
        ]

        return (
            <div>
                <BootstrapTable striped hover
                    data={reports}>
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