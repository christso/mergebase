import React from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Menu extends React.Component {
    componentDidMount() {
        console.log("props", this.props);
    }

    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">EntityProcess</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={2} href="/clients">Clients</NavItem>
                        <NavItem eventKey={6} href="/clients">Contacts</NavItem>
                        <NavItem eventKey={5} href="/jobs">Jobs</NavItem>                        
                        <NavItem eventKey={4} href="/reports">Reports</NavItem>
                        <NavItem eventKey={1} href="/settings">Settings</NavItem>
                        {this.renderLogin()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    renderLogin() {
        if (this.props.isLoggedIn) {
            return (
                <NavItem eventKey={4} href="/login">Logout</NavItem>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.app.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch)
}

Menu = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

export default Menu;