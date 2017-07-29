import React from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Menu extends React.Component {
    render() {
        return (
           <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">PIP</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </Navbar>            
        );
    }
}

export default Menu;