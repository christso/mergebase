import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Image, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { getClients, selectClient, selectClient2 } from '../../actions/clientActions'

// const data = {
//         // used to populate "account" reducer when "Load" is clicked
//         firstName: 'Jane',
//         lastName: 'Doe',
//         email: 'jane@gmail.com'
// }

class ClientBind2 extends Component {
    componentDidMount() {
        this.props.getClients();
        this.props.selectClient(this.props.match.params.id);
        // const { clientId, client } = this.handleLoad();
        // this.props.loadClient(client);

    }

    handleLoad() {
        const clientId = this.props.selectedClientId;
        const client = this.props.clients.filter(function (el) {
            return el._id == clientId;
        })[0];
        console.log("Client 1", client);

        this.props.loadClient(client);

        return {
            clientId: clientId,
            client: client
        };

    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const { clientId, client } = this.handleLoad();
        
        return (
            <Well>
                <h2>{client ? client.name : undefined}</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <button type="button" onClick={this.handleLoad.bind(this)}>
                            Load
                        </button>
                    </div>
                    <div>
                        <label>First Name</label>
                        <div>
                            <Field
                                name="firstName"
                                component="input"
                                type="text"
                                placeholder="First Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <div>
                            <Field
                                name="lastName"
                                component="input"
                                type="text"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <div>
                            <Field
                                name="email"
                                component="input"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={pristine || submitting}>
                            Submit
                        </button>
                    </div>
                </form>
            </Well>
        )
    }

}

ClientBind2 = reduxForm({
    form: 'simple' // a unique identifier for this form
})(ClientBind2);

function mapStateToProps(state, props) {
    return {
        initialValues: state.account.data,
        clients: state.clients.clients,
        selectedClientId: state.clients.selectedClientId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadClient: selectClient2,
        getClients: getClients,
        selectClient: selectClient
    }, dispatch)
}

// You have to connect() to any reducers that you wish to connect to yourself
ClientBind2 = connect(
    mapStateToProps,
    mapDispatchToProps // bind account loading action creator
)(ClientBind2)

export default ClientBind2;