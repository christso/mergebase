import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn, ButtonGroup, ShowSelectedOnlyButton } from 'react-bootstrap-table';
import universe from 'universe';
import { getClients } from '../actions/clientActions';
import { toggleSelectMergeCell } from '../actions/mergeActions';
import { getClients as wfmGetClients } from '../actions/wfmClientActions';
import { getClients as xplanGetClients } from '../actions/xplanClientActions';
import { getClientMergeList, extendClientList } from '../selectors/index';
import ReactTable from "react-table";

const columns =
    [
        {
            Header: "Match",
            columns: [
                {
                    Header: "Match",
                    accessor: "matchName",
                    aggregate: vals => vals[0]
                }
            ]
        },
        {
            Header: "Info",
            columns: [
                {
                    Header: "Name",
                    accessor: "name",
                    aggregate: vals => vals[0]
                },
                {
                    Header: "Email",
                    accessor: "email",
                    aggregate: vals => vals[0]
                },
                {
                    Header: "Phone",
                    accessor: "phone",
                    aggregate: vals => vals[0]
                }
            ]
        },
        {
            Header: "Source",
            columns: [
                {
                    Header: "INT",
                    accessor: "intFlag",
                    aggregate: vals => vals.reduce((previous, current) => current + previous),
                    width: 50
                },
                {
                    Header: "WFM",
                    accessor: "wfmFlag",
                    aggregate: vals => vals.reduce((previous, current) => current + previous),
                    width: 50
                },
                {
                    Header: "XPLAN",
                    accessor: "xplanFlag",
                    aggregate: vals => vals.reduce((previous, current) => current + previous),
                    width: 50
                }
            ]
        }
    ];


class MergeTool extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getClients();
        this.props.wfmGetClients();
        this.props.xplanGetClients();
    }

    getTdProps(state, rowInfo, column, instance) {

        const mergeSelection = this.props.mergeSelection;
        const selectedIndex = mergeSelection.findIndex((el) => {
            return rowInfo.row.matchName === el.matchName
                && column.Header === el.source
        });

        const isColumnSource = ["INT", "WFM", "XPLAN"].findIndex((el) => el === column.Header) > -1;

        let className = '';
        if (isColumnSource) {
            className = '-merge-count';
        }
        className = selectedIndex > -1 ? className + ' -selected' : className;
        
        return {
            className: className,
            onClick: (e, handleOriginal) => {
                // console.log('A Td Element was clicked!')
                // console.log('it produced this event:', e)
                // console.log('It was in this column:', column)
                // console.log('It was in this row:', rowInfo)
                // console.log('It was in this table instance:', instance)
                // console.log("MERGE", this.props.mergeSelection);

                if (isColumnSource) {
                    this.props.toggleSelectMergeCell(rowInfo.row.matchName, column.Header);
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
            <div className="panel">
                <div className="panel-heading">
                    Merge Tool
                </div>
                <div className="panel-body">
                    <ReactTable
                        data={clients}
                        columns={columns}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        getTdProps={this.getTdProps.bind(this)}
                        pivotBy={["matchName"]}
                    />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        clients: getClientMergeList(state),
        mergeSelection: state.merge
        //clients: extendClientList(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        wfmGetClients: wfmGetClients,
        xplanGetClients: xplanGetClients,
        toggleSelectMergeCell: toggleSelectMergeCell
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MergeTool);