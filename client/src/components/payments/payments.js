import 'bootstrap/dist/css/bootstrap.min.css';
import { GiPayMoney } from 'react-icons/gi'
import PaymentDetails from './paymentDetails.js'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import './payments.css'
import { actions } from "../../Redux/actions"
import { Elements } from '@stripe/react-stripe-js';
import { MdArrowBack } from 'react-icons/md'
import { withRouter } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        shoppingCart: state.shoppingCartReducer.shoppingCart,
        message: state.messageReducer.message
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(actions.logoutUser()),
        clearMessage: () => dispatch(actions.clearMessage()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function Payments(props) {
    const toMoney = (num) => {
        return `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    }
    
    let sum = 0;

    let shoppingCartNodes = [...Array.from(props && props?.shoppingCart?.products.map((product) => {
        sum += product.price * product.amount;

        return (<>
            <div className="container my-3">
                <img className="image m-0" src={product.img} alt="" />
                <div className="details">
                    <div className="lgNum">{product.amount}</div>
                    <h6 className="p-0">{product.name}</h6>
                    <h5>X {toMoney(product.price)}</h5>

                </div>
            </div>
            <h4 >+ {toMoney(product.price * product.amount)}</h4>
            <h3 style={{ color: "#ffb6b6" }}>= {toMoney(sum)}</h3>
        </>
        )
    }))]

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // props.clearMessage();

    //         if (!props.isLoggedIn) {
    //             setLoginModalShow(true)
    //         }
    //     }, 8000);
    //     return () => clearTimeout(timer);
    // }, []);
    const redirectToShipping = () => {
        props.history.goBack();
    }

    return (
        <>

            <Container className="pb-5" fluid="md">
                <Row style={{ alignItems: "center" }}>
                    <Col style={{ textAlign: "left" }} xs={3} className="py-5"> <MdArrowBack onClick={redirectToShipping} /> </Col>
                    <Col xs={6} > <h1 className="py-5 d-none d-sm-block">Payments </h1> <h1 className="py-5 d-block d-sm-none"><GiPayMoney size="35px" /></h1></Col>
                </Row>
                {/* <h1 className="py-5">Payments<GiPayMoney size="30px" className="ml-3" /></h1> */}
                <hr style={{ backgroundColor: "white" }} />

                <Row>
                    <Col lg={6} sm={12} className="pb-5">
                        {/* <ListGroup> */}
                        {shoppingCartNodes && shoppingCartNodes}

                        {/* </ListGroup> */}

                    </Col>
                    <Col lg={6} sm={12} >
                        <Card>
                            {/* <div className="App-color-header" >
                                         <h3 > Total price: ${props.shoppingCart.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h3>

                            </div> */}
                            <Card.Header >
                                <h3 className="mt-4 py-2"> Total price: {toMoney(props.shoppingCart.totalPrice)}</h3>

                            </Card.Header>
                            <Card.Body style={{ color: "#282c34" }}>
                                <Elements stripe={stripePromise}>

                                    <PaymentDetails price={props.shoppingCart.totalPrice}></PaymentDetails>
                                </Elements>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>


        </>
    );
}

)
)