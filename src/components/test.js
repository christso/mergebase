import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn, ButtonGroup, ShowSelectedOnlyButton } from 'react-bootstrap-table';
import universe from 'universe';
import { getClients } from '../actions/clientActions';
import { selectMergeCell } from '../actions/mergeActions';
import { getClients as wfmGetClients } from '../actions/wfmClientActions';
import { getClientMergeList, extendClientList } from '../selectors/index';
import ReactTable from "react-table";

class MergeTool extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getClients();
        this.props.wfmGetClients();
        // console.log(this.props.clients);
    }

    getTdProps(state, rowInfo, column, instance) {
        return {
            onClick: (e, handleOriginal) => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)

                console.log("MERGE", this.props.mergeSelection);
                if (column.Header === "INT") {
                    this.props.selectMergeCell(rowInfo.original.name, column.Header);
                } else if (column.Header === "WFM") {
                    this.props.selectMergeCell(rowInfo.original.name, column.Header);
                }

                // IMPORTANT! React-Table uses onClick internally to trigger 
                // events like expanding SubComponents and pivots. 
                // By default a custom 'onClick' handler will override this functionality. 
                // If you want to fire the original onClick handler, call the 
                // 'handleOriginal' function. 
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
        selectMergeCell: selectMergeCell
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MergeTool);