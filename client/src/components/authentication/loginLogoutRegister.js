import React, { useState, useEffect } from 'react';
import RegisterModal from './registerModal'
import LoginModal from './loginModal'
import { Button, FormGroup } from 'react-bootstrap';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions"

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        isLoggedIn: state.userReducer.isLoggedIn,
        message: state.messageReducer.message
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(actions.logoutUser()),
        clearMessage: () => dispatch(actions.clearMessage()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(function Home(props) {

    useEffect(() => {
        const timer = setTimeout(() => {
            // props.clearMessage();

            if (!props.isLoggedIn) {
                setLoginModalShow(true)
            }
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

    const [loginModalShow, setLoginModalShow] = useState(false);
    const [registerModalShow, setRegisterModalShow] = useState(false);

    const onClickShowLoginModal = () => {
        props.clearMessage();
        setLoginModalShow(true)
    }

    return (
        <>
            <FormGroup  className="mb-0">
                {props.isLoggedIn ? <Button onClick={props.logout} variant="outline-dark" size="sm" style={{ fontSize: "12px" }}>Log out</Button> : <Button onClick={onClickShowLoginModal} variant="outline-dark" size="sm" style={{ fontSize: "12px" }}>Log in</Button>}
                <p className="mb-0" style={{ color: "#ff84a3", fontSize: "12px" }}>{props.user && props.user?.username ? `Hi ${props.user.username}!` : `Guest`}</p>
            </FormGroup>

            <LoginModal
                // show={!props.isLoggedIn}
                show={loginModalShow}
                onHide={() => { setLoginModalShow(false) }}
                register={() => {
                    setLoginModalShow(false);
                    setRegisterModalShow(true);
                    props.clearMessage();
                }}

            />

            <RegisterModal
                show={registerModalShow}
                onHide={() => { setRegisterModalShow(false) }}
            />
        </>
    );
}


)