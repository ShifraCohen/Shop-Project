import React, { useState } from 'react';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions"
import { Button, Modal, Form } from 'react-bootstrap';
import validator from 'validator';
import loadingImg from '../../logo.png';

function mapStateToProps(state) {
    return {
        isLoggedIn: state.userReducer.isLoggedIn,
        message: state.messageReducer.message,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (emailAndPassword) => dispatch(actions.loginUser(emailAndPassword)),
        setMessage: (message) => dispatch(actions.setMessage(message)),
        clearMessage: () => dispatch(actions.clearMessage()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(function LoginModal(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    };

    function validatePassword() {
        setIsValidPassword(password.length < 9 ? false : true)
    }
    function validateEmail() {
        setIsValidEmail(!validator.isEmail(email) ? false : true)
    }

    function validateForm() {
        return isValidEmail && isValidPassword
    }

    const handleSubmit = async event => {
        event.preventDefault();
        if (validateForm()) {
            setLoading(true)
            try {
                await props.loginUser({
                    email,
                    password
                })
                setLoading(false);
                if (!props.isLoggedIn)
                    props.onHide(true)

            }
            catch (err) {
                setLoading(false);
            }
        }
        else {
            setLoading(false);
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header  closeButton>
                                

                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            {/* <div className="App-color-header">
                    Login
                </div> */}
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            onBlur={validateEmail}
                        />
                        {!isValidEmail ? <div className="alert alert-danger" role="alert">
                            Please enter a valid email!
                        </div> : <div></div>}
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        <Form.Text style={{ color: "red", fontSize: "18px" }} id="id">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            onBlur={validatePassword}
                        />
                        {!isValidPassword ? <div className="alert alert-danger" role="alert">
                            Password must have at least 9 characters!
                        </div> : <div></div>}
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button
                        className="mt-3"
                        variant="outline-dark"
                        type="submit"
                        // disabled={validateForm()}
                    >
                        Submit
                    </Button>
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
                </Form>

            </Modal.Body>
            <Modal.Footer>
                Not a member yet?
                <Button variant="outline-dark" onClick={props.register}>Register</Button>
            </Modal.Footer>
        </Modal>
    );
}
)