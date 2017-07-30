import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getClients, selectClients } from '../../actions/clientActions'

class ClientList extends Component {
    componentDidMount() {
        this.props.getClients();
    }
    onAfterSaveCell(row, cellName, cellValue) {
        console.log(`Save cell ${cellName} with value ${cellValue}`);

        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': ' + row[prop] + '\n';
        }

        console.log('update', {
            [cellName]: cellValue
        });
        // console.log('Thw whole row :\n' + rowStr);
    }
    

    onBeforeSaveCell(row, cellName, cellValue) {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        // console.log("before save", {
        //     [cellName]: cellValue
        // });        
        return true;
    }

    onRowSelect(row, isSelected) {
        // console.log("select", {
        //     row: row,
        //     isSelected: isSelected
        // });
        this.props.selectClients(row);
    }
    
    createCustomButtonGroup = props => {
        return (
            <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
                {props.insertBtn}
                {props.deleteBtn}
                <button type='button'
                    className={`btn btn-primary`}>
                    Bind
                </button>
            </ButtonGroup>
        );
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.onRowSelect.bind(this)
        };
        const options = {
            btnGroup: this.createCustomButtonGroup
        };
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell            
        };
        const clients = this.props.clients;
        return (
            <div>
            <ButtonGroup style={{ marginBottom: '15px' }} className='my-custom-class'>
                <Button bsStyle="primary">
                    New
                </Button>
                <Button bsStyle="primary">
                    Edit
                </Button>                                
                <Button bsStyle="primary">
                    Bind
                </Button>
                <Button bsStyle="primary">
                    Commit
                </Button>                
            </ButtonGroup>
            <BootstrapTable selectRow={selectRow} striped hover
                data={clients} cellEdit={cellEditProp}>
                <TableHeaderColumn isKey dataField='_id' hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
            </BootstrapTable>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        clients: state.clients.clients,
        wfmClients: state.wfmClients.clients,
        xplanClients: state.xplanClients.clients
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getClients,
        selectClients: selectClients
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);