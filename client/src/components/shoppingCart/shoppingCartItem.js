import React, { useState } from "react";
import { Button, Card, ButtonGroup } from "react-bootstrap";
import { actions } from '../../Redux/actions'
import { connect } from "react-redux";
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeProductFromCart: (productId) => dispatch(actions.removeProductFromCart(productId)),
        addProductToCart: (productId) => dispatch(actions.addProductToCart(productId)),
        increaseProductQuentity: (productId) => dispatch(actions.increaseProductQuentity(productId)),
        decreaseProductQuentity: (productId) => dispatch(actions.decreaseProductQuentity(productId)),
        removeAllUnitsOfProductFromCart: (productId) => dispatch(actions.removeAllUnitsOfProductFromCart(productId)),
    };

} export default connect(mapStateToProps, mapDispatchToProps)(function Product(props) {
    // let base64ToString = Buffer.from(props.product.img.img.data, "base64").toString()
    // let imgSrc = `data:image/jpeg;base64,${base64ToString}`;

    const onClickRemoveProductFromCart = () => {
        props.increaseProductQuentity(props.product._id)
        props.removeProductFromCart(props.product._id)
    }

    const onClickAddProductToCart = () => {
        props.decreaseProductQuentity(props.product._id)
        props.addProductToCart(props.product)
    }

    const onClickRemoveAll = () => {
        props.removeAllUnitsOfProductFromCart(props.product._id)
    }

    return (<>
        <Card className="mb-2" >
            <Card.Img className="mt-1" src={props.product.img} alt="" />
            <Card.Body>
                <Card.Title>
                    <h6>{props.product.name}</h6>
                </Card.Title>
                <Card.Text>
                    <h5>price :{props.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$</h5>
                    <h6>amount : {props.product.amount}</h6>
                    <ButtonGroup aria-label="add-remove-removeAll">
                        <Button onClick={onClickRemoveAll} variant="outline-dark" block size="sm">Remove All</Button>{' '}
                        <Button onClick={onClickRemoveProductFromCart} variant="outline-dark" size="sm"><BiDownArrow /> </Button>{' '}
                        <Button onClick={onClickAddProductToCart} variant="outline-dark" size="sm"> <BiUpArrow /> </Button>{' '}
                    </ButtonGroup>
                </Card.Text>
            </Card.Body>
        </Card>
    </>
    );
}
)