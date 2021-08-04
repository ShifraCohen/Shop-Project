import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../logo.png';



import React, { useState } from 'react';
import socket from 'socket.io-client';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginLogoutRegister from '../authentication/loginLogoutRegister.js';
import ShoppingCartList from "../shoppingCart/shoppingCartList";





export default function Navigation(props) {
    return (
        <>

            <Navbar collapseOnSelect expand="sm" sticky="top" bg="light" variant="light" style={{ fontSize: "calc(9px + 2vmin)" }} >
                <LinkContainer to="/">
                    <Navbar.Brand >
                        <img src={logo} className="App-logo" alt="logo" />
                        <Navbar.Text style={{ fontSize: "17px", color: "#ff84a3" }} >
                            Decorative.
                        </Navbar.Text>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/products">
                            <Nav.Link>Products</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                <ShoppingCartList></ShoppingCartList>
                <LoginLogoutRegister></LoginLogoutRegister>
            </Navbar>


        </>
    )
}