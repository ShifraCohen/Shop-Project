import React, { useState } from 'react';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions"
import { Button, Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import { FaShippingFast } from 'react-icons/fa'
import { MdArrowBack } from 'react-icons/md'
import NewAddress from './newAddress'
import MyCustomToggle from './customToggle'
import {withRouter} from 'react-router-dom'

function mapStateToProps(state) {
    return {
        message: state.messageReducer.message,
        user: state.userReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addNewAddress: (newAddress) => dispatch(actions.addNewAddress(newAddress)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function Shipping(props) {
    const [showAddNewAddress, setShowAddNewAddress] = useState(false);
    let i = 0;
    let addressNodes = props.user.addressList.length ?
        [...Array.from(props.user.addressList.map((address) => {
            i++;
            return (
                <>
                    <Card key={i} style={{ color: "black", textAlign: "left" }}>
                        <Accordion.Toggle as={Card.Footer} eventKey={i} className="p-0">
                            <MyCustomToggle streetAddress={address.streetAddress} city={address.city} eventKey={i} />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={i}>
                            <>
                                <Card.Body>
                                    {address.fullName}<br />
                                    {address.phone}<br />
                                    {address.streetAddress}<br />
                                    {address.city}<br />
                                    {address.country}<br />
                                    {address.zipCode}<br />
                                </Card.Body>
                            </>
                        </Accordion.Collapse>
                    </Card>
                </>
            )
        }))] : <h3>No addresses...</h3>

    const ToggleShowNewAddress = () => {
        setShowAddNewAddress(!showAddNewAddress)
    }
    const redirectToProducts = () => {
        props.history.goBack();
    }
    return (
        <>
            <Container className="pb-5" fluid="md">
                <Row style={{ alignItems: "center" }}>
                    <Col style={{ textAlign: "left" }} xs={3} className="py-5"> <MdArrowBack onClick={redirectToProducts} /> </Col>
                    <Col xs={6} > <h1 className="py-5 d-none d-sm-block">Shipping </h1> <h1 className="py-5 d-block d-sm-none"><FaShippingFast size="35px" /></h1></Col>
                </Row>
                <hr style={{ backgroundColor: "white" }} />
                <Accordion defaultActiveKey={1} className="mt-5">  {addressNodes}  </Accordion>
                <Button
                    className="my-3"
                    variant="outline-light"
                    block
                    size="lg"
                    disabled={showAddNewAddress}
                    onClick={ToggleShowNewAddress}
                >
                    Add new address
                </Button>
                {showAddNewAddress && (<NewAddress ToggleShowNewAddress={ToggleShowNewAddress}></NewAddress>)}
            </Container>
        </>
    );
}
))