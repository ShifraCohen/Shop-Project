import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProductsList from "./productsList";
// import ShoppingCartList from "./shoppingCartList";
import { actions } from '../../Redux/actions'
import loadingImg from '../../logo.png';
import { FormControl, CardColumns, InputGroup, Container, Row, Col, Card } from "react-bootstrap";
import Product from "./product";
import { ImSearch } from 'react-icons/im';

function mapStateToProps(state) {
    return {
        categories: state.categoryReducer.categories,
        products: state.productReducer.products,
        shoppingCart: state.shoppingCartReducer.shoppingCart,
        message: state.messageReducer.message,
        isLoggedIn: state.userReducer.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategories: () => dispatch(actions.getAllCategories()),
        getProductsByCategoryId: (categoryId) => dispatch(actions.getProductsByCategoryId(categoryId)),
        getAllProducts: () => dispatch(actions.getAllProducts()),
        clearMessage: () => dispatch(actions.clearMessage()),
    };

} export default connect(mapStateToProps, mapDispatchToProps)(function ShowAllUsers(props) {

    useEffect(() => {

        setLoading(true);
        async function getProducts() {
            props.clearMessage();
            await props.getAllCategories();
            await props.getAllProducts();
            // await props.getProductsByCategoryId(props.categories[0]);
            setLoading(false)
        }
        getProducts()
    }, [props.products.length]);

    const [loading, setLoading] = useState(true);
    const [filteredProductNodes, setFilteredProductNodes] = useState()
    const [searchVal, setSearchVal] = useState('')
    // const [category, setCategory] = useState('')

    let temp = [...Array.from(props.products).map((p) => {
        return (<Product key={p._id} product={p} ></Product>)
    })]
    // setFilteredProductNodes([
    //     ...Array.from(props.products)
    //         .filter((p) => p.category===props.categories[0]._id)
    //         .map((p) => { return <Product key={p._id} product={p}></Product> })
    // ])
    // let temp = ([
    //     ...Array.from(props.products)
    //         .filter((p) => p.category===props.categories[0]._id)
    //         .map((p) => { return <Product key={p._id} product={p}></Product> })
    // ])
    const filterProducts = (e) => {
        let val = e.target.value.toLowerCase();
        setSearchVal(val)
        setFilteredProductNodes([
            ...Array.from(props.products)
                .filter((p) => p.name.toLowerCase().includes(val) || p.description.toLowerCase().includes(val))
                .map((p) => { return <Product key={p._id} product={p}></Product> })
        ])
    }
    // const filterProductsByCategory = (e) => {
    //     let val = e.target.value;
    //     setSearchVal(val)

    // }
    const handleCategoryChange = async (e) => {
        let val = e.target.value;
        // await props.getProductsByCategoryId(e.target.id);

        // setFilteredProductNodes([...Array.from(props.productsFilteredByCategory)
        setFilteredProductNodes([...Array.from(props.products)
            .filter((p) =>
                p.category.name === val)
            .map((p) => { return <Product key={p._id} product={p}></Product> })
        ])
    };
    return (<>



        <Container fluid="lg">
            {/* <Row>
                <Col > */}
                    {/* <h1 className="mt-4">Products</h1> */}

                    {!props.isLoggedIn && (
                        <h4 className="mt-4" >Please log in to enable shopping</h4>
                    )}
                    {props.message && (
                        <h1 className="mt-4" >{props.message}</h1>
                    )}

                    <InputGroup size="lg" className="py-4">
                        {/* <img width="80px" src={search} alt=""></img> */}
                        <FormControl
                            required
                            as="select"
                            onChange={handleCategoryChange}
                        >
                            {/* <option>Select category</option> */}
                            {props.categories && props.categories.map((c) => {
                                return (<option id={c._id} value={c.name}>{c.name}</option>)
                            })}
                        </FormControl>
                        <FormControl type="text" onChange={filterProducts} className='mb-5' />
                        <ImSearch className='my-2 ml-1' />
                    </InputGroup>
                    <CardColumns>
                        {filteredProductNodes ? filteredProductNodes : temp && temp}
                    </CardColumns>

                    {/* <ProductsList products={Array.from(props.products)} categories={Array.from(props.categories)} /> */}
                    {loading && (
                        <img src={loadingImg} className="App-loading" alt="loading" />
                    )}
                {/* </Col>
            </Row> */}
        </Container>
    </>

    )
})