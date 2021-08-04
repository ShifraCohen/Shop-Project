import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import './home.css'
import chair from '../../chair2.png'
import pillow from '../../pillow2.png'
import barTable from '../../bar table2.png'
// import barTable from '../../bar table.png'
import storageBox from '../../storage box.png'
import tablecloth from '../../Tablecloth.png'
import { Col, Container, Row } from 'react-bootstrap';
// function mapStateToProps(state) {
//     return {
//         user: state.userReducer.user,
//         isLoggedIn: state.userReducer.isLoggedIn,
//         message: state.messageReducer.message
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         logout: () => dispatch(actions.logoutUser()),
//         clearMessage: () => dispatch(actions.clearMessage()),
//     };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(
export default function Home(props) {

    // useEffect(() => {
    //     // props.clearMessage();

    //     const timer = setTimeout(() => {
    //         if (!props.isLoggedIn) {
    //             setLoginModalShow(true)
    //         }
    //     }, 500);
    //     return () => clearTimeout(timer);
    // }, []);


    return (
        <>
            <div className="home-background">
                <Container fluid>
                    <svg className="svg-lg" viewBox="0 0 960 300">
                        <symbol id="s-text">
                            <text textAnchor="middle" x="50%" y="80%">Decorative.</text>
                        </symbol>
                        <g className="g-ants">
                            <use xlinkHref="#s-text" className="text-copy"></use>
                            <use xlinkHref="#s-text" className="text-copy"></use>
                            <use xlinkHref="#s-text" className="text-copy"></use>
                            <use xlinkHref="#s-text" className="text-copy"></use>
                            <use xlinkHref="#s-text" className="text-copy"></use>

                        </g>
                    </svg>
                    <Row className="mr-0">
                       
                        <Col className="p-0">
                            <div className="img-container my-5" >
                                <img style={{ width: "38vw" }} className="image m-0" src={chair} alt="" />
                                <div className="category-name">Chairs</div>
                            </div>
                            <div className="img-container" >
                                <img  style={{ width: "12vw",bottom:"12%" }}className="image m-5" src={pillow} alt="" />
                                <div 
                                // style={{ fontSize: "15px", top: "37%", left: "0" }} 
                                className="category-name ml-5">Pilows</div>
                            </div>
                        </Col>
                        {/* <Col sm={1} className="p-0" >
                          
                        </Col> */}
                        <Col className="p-0">
                            <div className="img-container my-5" >
                                <img style={{ width: "27vw" }} className="image m-0" src={storageBox} alt="" />
                                <div className="category-name">Storage Box</div>
                            </div>
                        </Col>
                         <Col className="p-0">
                            <div className="img-container my-5" >
                                <img style={{ width: "30vw" }} className="image m-0" src={barTable} alt="" />
                                <div className="category-name">Bar Tables</div>
                            </div>

                        </Col>
                        <Col >

                        </Col>
                    </Row>
                </Container>

                <div style={{ width: "35vw", right: "0" }} className="img-container my-3" >
                    <img className="image m-0" src={tablecloth} alt="" />
                    <div className="category-name">Tablecloth</div>
                </div>





            </div>
        </>
    );
}

