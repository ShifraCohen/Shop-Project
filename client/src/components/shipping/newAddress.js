import React, { useState } from 'react';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions"
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import validator from 'validator';
import loadingImg from '../../image2vector.svg';
import { IoCloseOutline } from 'react-icons/io5'

function mapStateToProps(state) {
    return {
        message: state.messageReducer.message,
        addressList: state.userReducer.addressList
    };
}
function mapDispatchToProps(dispatch) {
    return {
        clearMessage: () => dispatch(actions.clearMessage()),
        addNewAddress: (newAddress) => dispatch(actions.addNewAddress(newAddress)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(function RegisterModal(props) {

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // props.clearMessage();

    //         if (!props.isLoggedIn) {
    //             setLoginModalShow(true)
    //         }
    //     }, 8000);
    //     return () => clearTimeout(timer);
    // }, []);




    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [isValidZipCode, setIsValidZipCode] = useState(true)
    const [isValidFullName, setIsValidFullName] = useState(true)
    const [isValidForm, setIsValidForm] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleFullNameChange = event => {
        setFullName(event.target.value)
    };

    const handlePhoneChange = event => {
        setPhone(event.target.value)
    };
    const handleCountryChange = event => {
        setCountry(event.target.value)
    };
    const handleStreetAddressChange = event => {
        setStreetAddress(event.target.value)
    };
    const handleCityChange = event => {
        setCity(event.target.value)
    };
    const handleZipCodeChange = event => {
        setZipCode(event.target.value)
    };

    const validateFullName = () => {
        setIsValidFullName(true)
        setIsValidForm(true)
        if (fullName.includes(' ')) {
            let fullNameStrings = fullName.split(' ');
            console.log(fullNameStrings);
            for (const s of fullNameStrings) {
                if (!validator.isAlpha(s))
                    setIsValidFullName(false)
                setIsValidForm(false)
            }
        }
        else {
            setIsValidFullName(false)
            setIsValidForm(false)
        }
    }
    const validateZipCode = () => {
        // setIsValidZipCode(!validator.isEmail(email) ? false : true)
    }

    const validateForm = () => {
        return isValidFullName && isValidZipCode
    }
    const handleSubmit = async event => {
        event.preventDefault();
        if (validateForm()) {
            setLoading(true);
            console.log(loading);
            try {
                await props.addNewAddress({
                    fullName,
                    phone,
                    country,
                    streetAddress,
                    city,
                    zipCode
                })
                setLoading(false);
                setTimeout(() => {
                    props.clearMessage();
                }, 3000);

            }
            catch (err) {
                setLoading(false);
                setTimeout(() => {
                    props.clearMessage();
                }, 3000);
            }
        }
        else {
            setLoading(false);
            setTimeout(() => {
                props.clearMessage();
            }, 3000);
        }

    };

    return (
        <>

            {/* <Container className="pb-5" fluid="md">

                <h1 className="py-5">Shipping<FaShippingFast size="30px" className="ml-3" /></h1>
                <hr style={{ backgroundColor: "white" }} />
                <div className="pt-5"> */}
            <Card >
                <Card.Header >

                    <button type="button" onClick={props.ToggleShowNewAddress} class="close" aria-label="Close">
                        <span style={{ fontSize: "30px" }} aria-hidden="true">&times;</span>
                    </button>
                 Please enter address to shipping
                    {/* < IoCloseOutline/> */}

                </Card.Header>
                <Card.Body style={{ color: "black" }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicFullName">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Full name"
                                value={fullName}
                                onChange={handleFullNameChange}
                                required
                                onBlur={validateFullName}
                            />
                            {!isValidFullName ? <div className="alert alert-danger" role="alert">
                                Can't have spaces, numbers and symbols
                                       </div> : <div></div>}
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={handleCountryChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicStreetAddress">
                            <Form.Label>Street Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                onChange={handleStreetAddressChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={handleCityChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicZipCode">
                            <Form.Label>ZIP code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ZIP code"
                                value={zipCode}
                                onChange={handleZipCodeChange}
                            // required
                            />
                        </Form.Group>
                        {loading && (
                            <img src={loadingImg} className="App-loading" alt="loading" />
                        )}
                        {props.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {props.message}
                                </div>
                            </div>
                        )}
                        <Row className="mt-4">
                            <Col>

                                <Button
                                    variant="outline-dark"
                                    size="lg"
                                    block
                                    type="submit"
                                // disabled={validateForm()}
                                >
                                    Add address
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="outline-dark"
                                    size="lg"
                                    block
                                    onClick={props.ToggleShowNewAddress}
                                >
                                    Cancle
                                </Button>
                            </Col>
                        </Row>

                    </Form>

                </Card.Body>
            </Card>
            {/* </div>

            </Container> */}
        </>
    );
}
)