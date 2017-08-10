import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { findClient, updateClient } from '../actions/clientActions';
import { updateClient as updateWfmClient } from '../actions/wfmClientActions';
import { Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';

const makeDefaultState = () => ({
    showModal: false,
    modal: {
        title: '',
        body: ''
    }
});

class ClientEdit extends Component {
    constructor(props) {
        super(props);
        this.state = makeDefaultState();
        this.renderModal.bind(this);
    }

    renderButtons() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div role="toolbar" className="btn-toolbar">
                <button type="submit" onClick={handleSubmit(this.handleSave.bind(this))}
                    className="btn btn-primary" disabled={submitting}>Save</button>
                <button type="submit" onClick={handleSubmit(this.handleBroadcast.bind(this))}
                    className="btn btn-primary" disabled={submitting}>Broadcast</button>

                <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            ...
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    renderEditor() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const client = this.props.foundClient;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        INTERNAL
                        </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group has-feedback">
                                <label>ID</label>
                                <Field
                                    className="form-control"
                                    label="ID"
                                    type="text"
                                    placeholder="Enter ID"
                                    name="_id"
                                    component="input"
                                    readOnly />
                            </div>

                            <div className="form-group has-feedback">
                                <label>Name</label>
                                <Field
                                    className="form-control"
                                    label="Name"
                                    type="text"
                                    placeholder="Enter Name"
                                    name="name"
                                    component="input"
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label>Email</label>
                                <Field
                                    className="form-control"
                                    label="Email"
                                    type="text"
                                    placeholder="Enter Email"
                                    name="email"
                                    component="input"
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label>Phone</label>
                                <Field
                                    className="form-control"
                                    label="Phone"
                                    type="text"
                                    placeholder="Enter Phone"
                                    name="phone"
                                    component="input"
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label>Address</label>
                                <Field
                                    className="form-control"
                                    label="Address"
                                    type="text"
                                    placeholder="Enter Address"
                                    name="address"
                                    component="input"
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label>Comment</label>
                                <Field
                                    className="form-control"
                                    label="Comment"
                                    placeholder="Enter Comment"
                                    name="comment"
                                    component="textarea"
                                />
                            </div>
                            {this.renderButtons()}
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.findClient(this.props.match.params.id);
    }

    handleBroadcast(values) {
        // console.log("FOUND CLIENT", this.props.foundClient);
        if (this.props.foundClient) {
            this.props.updateWfmClient(this.props.foundClient);
        }
        this.open(<div>Broadcasted Client</div>, values.name);
    }

    handleSave(values) {
        this.props.updateClient(values);
        this.open(<div>Saved Client</div>, values.name);
    }
    
    open(title, body) {
        this.setState({ 
            showModal: true,
            modal: {
                title: title,
                body: body
            }
        });
    }

    close() {
        this.setState({ showModal: false })
    }

    renderModal() {
        return (
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.modal.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        const client = this.props.foundClient;

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h1 className="page-header">{client ? client.name : undefined}</h1>
                    {this.renderEditor()}
                </div>
                {this.renderModal()}
            </div>
        )
    }
}

ClientEdit = reduxForm({
    form: 'clientEditForm' // a unique identifier for this form
})(ClientEdit);

function mapStateToProps(state, props) {
    return {
        initialValues: state.clients.foundClient,
        clients: state.clients.clients,
        wfmClients: state.wfmClients.clients,
        xplanClients: state.xplanClients.clients,
        foundClient: state.clients.foundClient
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        findClient: findClient,
        updateClient: updateClient,
        updateWfmClient: updateWfmClient
    }, dispatch)
}

ClientEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientEdit);

export default ClientEdit;