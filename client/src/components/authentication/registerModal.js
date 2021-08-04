import React, { useState } from 'react';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions"
import { Button, Modal, Form } from 'react-bootstrap';
import validator from 'validator';
import loadingImg from '../../logo.png';
function mapStateToProps(state) {
    return {
        message: state.messageReducer.message,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        registerUser: (userDetails) => dispatch(actions.registerUser(userDetails)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(function RegisterModal(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidUsername, setIsValidUsername] = useState(true)
    const [loading, setLoading] = useState(false)


    const handleEmailChange = event => {
        setEmail(event.target.value)
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    };
    const handleUsernameChange = event => {
        setUsername(event.target.value)
    };
    const validatePassword = () => {
        setIsValidPassword(password.length < 9 ? false : true)
    }
    const validateEmail = () => {
        setIsValidEmail(!validator.isEmail(email) ? false : true)
    }
    const validateUsername = () => {
        setIsValidUsername(!validator.isAlpha(username) ? false : true)
    }
    const validateForm = () => {
        return isValidEmail && isValidPassword
    }
    const handleSubmit = async event => {
        event.preventDefault();
        if (validateForm()) {
            setLoading(true);
            console.log(loading);
            try {
                await props.registerUser({
                    email,
                    password,
                    username
                })
                setLoading(false);
                if (props.isLoggedIn)
                    props.onHide(true)
            }
            catch (err) {
                setLoading(false);
            }
        }
        else {
            setLoading(false);
        }

    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header   closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Register
                </Modal.Title>
            </Modal.Header>
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
                    <Form.Group controlId="formBasicUserName">
                        <Form.Label>User name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="User name"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            onBlur={validateUsername}
                        />
                        {!isValidUsername ? <div className="alert alert-danger" role="alert">
                            Can't have spaces, numbers and symbols
                        </div> : <div></div>}
                    </Form.Group>
                    <Button
                        className="mt-3"
                        variant="outline-dark"
                        type="submit"
                    //  disabled={!validateForm()}
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
                {/* <Button onClick={props.onHide}>close</Button> */}
            </Modal.Footer>
        </Modal>
    );
}
)