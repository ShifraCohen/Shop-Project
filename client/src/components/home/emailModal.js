import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions"
import { Button, Modal, Form } from 'react-bootstrap';
import validator from 'validator';

function mapStateToProps(state) {
    return {
        isLoggedIn: state.userReducer.isLoggedIn,
        message: state.messageReducer.message,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendMail: (emailAndName) => dispatch(actions.sendMail(emailAndName)),
      
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(function LoginModal(props) {

    // useEffect(() => {
    //     props.onHide(props.isLoggedIn)

    // }, []);

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    // const [isValidPassword, setIsValidPassword] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [loading, setLoading] = useState('');

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };

    const handleNameChange = event => {
        setUsername(event.target.value)
    };

    // function validatePassword() {
    //     setIsValidPassword(password.length < 9 ? false : true)
    // }
    function validateEmail() {
        setIsValidEmail(!validator.isEmail(email) ? false : true)
    }

    function validateForm() {
        return isValidEmail 
        // && isValidPassword
    }

    const handleSubmit = async event => {
        event.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                await props.sendMail({
                    email,
                    username
                })
                setLoading(false);
                if (props.isLoggedIn)
                    props.onHide(true)
            }
            catch (err) {
                setLoading(false);
                // props.setMessage("Failed to fetch, please try again")
                // document.querySelector("#id").innerHTML = props.message
                // document.querySelector("#id").innerHTML = "Failed to fetch, please try again"
            }
        }
        else {
            setLoading(false);
        }
    }

    return (
        <Modal
            // show={(!props.isLoggedIn)}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
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
                        <Form.Text style={{ color: "red", fontSize: "18px" }} id="id">
                        </Form.Text>
                    </Form.Group>


                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={handleNameChange}
                            required
                            // onBlur={validatePassword}
                        />
                        {/* {!isValidPassword ? <div className="alert alert-danger" role="alert">
                            Password must have at least 9 characters!
                        </div> : <div></div>} */}
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button
                        className="mt-3"
                        variant="primary"
                        type="submit"
                    // disabled={validateForm()}
                    >
                        Submit
                    </Button>
                    {loading && (
                        <span className="spinner-border spinner-border-sm ml-5"></span>
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
                {/* <Button onClick={props.register}>register</Button> */}
            </Modal.Footer>
        </Modal>
    );
}
)