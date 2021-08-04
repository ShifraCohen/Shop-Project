import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ShoppingCartItem from "./shoppingCartItem";
import { Modal, Container, Button, Card, FormGroup, InputGroup } from "react-bootstrap";
import { useState } from 'react';
import { IoMdCart } from 'react-icons/io'
import { GiPayMoney } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import { actions } from '../../Redux/actions'
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCartReducer.shoppingCart,
    };
}

export default connect(mapStateToProps, null)(withRouter(function ShoppingCartsList(props) {
    const [modalShow, setModalShow] = useState(false)

    let shoppingCartNodes = [...Array.from(props.shoppingCart.products.map((product) => {
        return (
            <ShoppingCartItem
                key={product._id}
                product={product}
            >
            </ShoppingCartItem>
        )
    }))]

    const handleClickGoToPay = () => {
        let isWonnaPay = window.confirm("Are you sure you want to finish your shopping?")
        setModalShow(false)
        if (isWonnaPay) {
            props.history.push('/shipping')
        }
    }

    return (
        <>
            <FormGroup onClick={() => setModalShow(true)} className="mb-0 mr-2">
                <strong className="mb-0 pb-0" style={{ color: "#ff84a3", fontSize: "15px" }}>
                    {props.shoppingCart.totalItems}
                </strong>
                <IoMdCart className="" size="35px" />
            </FormGroup>
            <Modal
                show={modalShow}
                onHide={() => { setModalShow(false) }}
            >
                <Modal.Header closeButton>

                    <IoMdCart size="40px" /> Shopping Cart
                </Modal.Header>
                <Button onClick={handleClickGoToPay} className="mb-4 py-2" variant="outline-dark" block disabled={!props.shoppingCart.products.length} >
                    Go to pay  {props.shoppingCart.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$
                         <GiPayMoney size="30px" className="ml-3" />
                </Button>
                <hr />
                {shoppingCartNodes && shoppingCartNodes}
              
            </Modal>
         
        </>
    );
}))
// export default withRouter(ShoppingCartsList)