import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import ProductModal from './productModal';
import { actions } from '../../Redux/actions'
import { connect } from "react-redux";
import { IoMdCart } from 'react-icons/io'

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        isLoggedIn: state.userReducer.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addProductToCart: (product) => dispatch(actions.addProductToCart(product)),
        decreaseProductQuentity: (productId) => dispatch(actions.decreaseProductQuentity(productId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(function Product(props) {

    // let base64ToString = Buffer.from(props.product.img.img.data, "base64").toString()
    // let imgSrc = `data:image/jpeg;base64,${base64ToString}`;
    const [productModalShow, setProductModalShow] = useState(false);

    const onClickShowProductModal = () => {
        setProductModalShow(true)
    }

    const onClickAddProductToCart = () => {
        props.decreaseProductQuentity(props.product._id)
        props.addProductToCart(props.product)
    }


    return (<>
        <Card className="mb-2" style={{color:"#282c34"}}>
            <Card.Img className="py-3 px-3" onClick={onClickShowProductModal} src={props.product.img} alt="" />

            <Card.Body>
                <Card.Title>
                    <h3> {props.product.name}</h3>
                </Card.Title>
<hr></hr>
                <Card.Text>
                    {props.product.description}
                    <h4> price : ${props.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h4>

                    <h5>Units in Stock: {props.product.quentity}</h5>
                </Card.Text>
                <Button onClick={onClickAddProductToCart} variant="outline-dark" block disabled={!props.isLoggedIn} >Add to Cart <IoMdCart size="30px" className="ml-1" /></Button>{' '}
            </Card.Body>
        </Card>
        <ProductModal
            show={productModalShow}
            onHide={() => { setProductModalShow(false) }}
            name={props.product.name}
            imgSrc={props.product.img}
            price={props.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        />
    </>
    );
}
)