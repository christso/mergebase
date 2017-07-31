import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { load as loadAccount } from '../../account';
import { connect } from 'react-redux'
import { getClients, selectClient } from '../../actions/clientActions'
import { bindActionCreators } from 'redux'

const data = {
    // used to populate "account" reducer when "Load" is clicked
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@gmail.com'
}

class ClientBind2 extends Component {
    componentDidMount() {
        // this.props.getClients();
        // this.props.selectClient(this.props.match.params.id);        
        const { handleSubmit, pristine, reset, submitting, load } = this.props;
 
        load(data);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, load } = this.props;

        return (
            <form onSubmit={handleSubmit}>
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
        )
    }

}

ClientBind2 = reduxForm({
    form: 'simple' // a unique identifier for this form
})(ClientBind2);

// You have to connect() to any reducers that you wish to connect to yourself
ClientBind2 = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(ClientBind2)

export default ClientBind2;