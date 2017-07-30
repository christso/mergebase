import React, { Component } from 'react';
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel, Table, Grid, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getWfmClients } from '../../actions/wfmClientActions'

class ClientList extends Component {
    componentDidMount() {
        this.props.getClients();
    }

    createCustomButtonGroup = (props) => {
        return (
            <ButtonGroup style={{ marginBottom: '10px' }} className='my-custom-class'>
                <Button bsStyle="default">
                    <Glyphicon glyph="plus"></Glyphicon> New</Button>
                <Button bsStyle="default">
                    <Glyphicon glyph="pencil"></Glyphicon> Edit</Button>
            </ButtonGroup>
        );
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
        };
        const options = {
            btnGroup: this.createCustomButtonGroup
        };

        const clients = this.props.clients;
        return (
            <BootstrapTable striped hover
                selectRow={selectRow}
                options={options}
                data={clients}>
                <TableHeaderColumn isKey dataField='wfmID' hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}


function mapStateToProps(state) {
    return { clients: state.wfmClients.clients };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getClients: getWfmClients
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);