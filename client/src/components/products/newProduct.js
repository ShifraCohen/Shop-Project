import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions"
import { Button, Toast, Card, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import validator from 'validator';
import loadingImg from '../../image2vector.svg';
import '../../App.css'
import Product from './product'

function mapStateToProps(state) {
    return {
        categories: state.categoryReducer.categories,
        message: state.messageReducer.message,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategories: () => dispatch(actions.getAllCategories()),
        addCategory: () => dispatch(actions.addCategory()),
        addProduct: (newProduct) => dispatch(actions.addProduct(newProduct)),
        clearMessage: () => dispatch(actions.clearMessage()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(function NewProduct(props) {
    useEffect(() => {
        async function getCategoryies() {
            await props.getAllCategories();
        }
        getCategoryies();
    }, [props.categories.length]);
    const [productName, setProductName] = useState('')
    const [category, setCategory] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [description, setDescription] = useState('')
    const [quentity, setQuentity] = useState('')
    const [price, setPrice] = useState('')
    const [imgData, setImgData] = useState('')
    const [isValidName, setIsValidName] = useState(true)
    const [showNewCategory, setShowNewCategory] = useState(false)
    // const [isValidEmail, setIsValidEmail] = useState(true)
    const [loading, setLoading] = useState('');
    // let temp = [...Array.from(props.images)]

    const handleProductNameChange = event => {
        setProductName(event.target.value)
    };
    const handleCategoryChange = event => {
        setCategory(event.target.value)
    };
    const handleNewCategoryChange = event => {
        setNewCategory(event.target.value)
    };

    const handleDescriptionChange = event => {
        setDescription(event.target.value)
    };
    const handleQuentityChange = event => {
        setQuentity(event.target.value)
    };
    const handlePriceChange = event => {
        setPrice(event.target.value)
    };

    const handleImgFileChange = event => {
        let fReader = new FileReader();
        fReader.readAsDataURL(event.target.files[0]);
        fReader.onloadend = function (event) {
            setImgData(event.target.result);
        }
    };
    const toggleShowNewCategory = () => setShowNewCategory(!showNewCategory);

    // function validatePassword() {
    //     setIsValidPassword(password.length < 9 ? false : true)
    // }
    // function validateEmail() {
    //     setIsValidEmail(!validator.isEmail(email) ? false : true)
    // }

    // function validateForm() {
    //     return isValidEmail && isValidPassword
    // }
    const addCategory = async () => {
        setLoading(true);
        try {
            await props.addCategory(newCategory);
            await props.getAllCategories();
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleSubmit = async event => {
        event.preventDefault();
        // if (validateForm()) {
        setLoading(true);
        try {
            await props.addProduct({
                productName,
                category,
                description,
                quentity,
                price,
                imgData,
            })
            setLoading(false);
            setTimeout(() => {
                props.clearMessage();
            }, 2000);

        }
        catch (err) {
            setLoading(false);
            // props.setMessage("Failed to fetch, please try again")
            // document.querySelector("#id").innerHTML = props.message
            // document.querySelector("#id").innerHTML = "Failed to fetch, please try again"
        }
        // }
        // else {
        //     setLoading(false);
        // }
    }

    return (
        <>
            <Container fluid="sm">
                <h1 className="pt-5">Adding a new product</h1>
                <hr style={{ backgroundColor: "white" }} />
                <Row className="pt-5" style={{ color: "black" }}>
                    <Col className="pb-5" sm={12} lg={8}>

                        <Form onSubmit={handleSubmit} >
                            <Card >
                                <Card.Header >
                                    <h3 className="mt-4 py-2"> Please enter product details</h3>
                                </Card.Header >
                                <Card.Body style={{ textAlign: "left", fontSize: "20px" }}>
                                    <Form.Group as={Row} controlId="productNameInput">
                                        <Form.Label column sm={3}>Name</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter product name"
                                                value={productName}
                                                onChange={handleProductNameChange}
                                                required
                                            />
                                        </Col>
                                       
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="categoryInput" >
                                        <Form.Label column sm={3}>Category</Form.Label>
                                        <Col >
                                            <InputGroup>
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    onChange={handleCategoryChange}
                                                    value={category}
                                                >
                                                    <option>Select category</option>
                                                    {props.categories && props.categories.map((c) => {
                                                        return (<option value={c.name}>{c.name}</option>)
                                                    })}
                                                </Form.Control>
                                                <Button variant="outline-dark" onClick={toggleShowNewCategory}>New</Button>
                                            </InputGroup>

                                        </Col>

                                    </Form.Group>

                                    <Toast animation={true} show={showNewCategory} onClose={toggleShowNewCategory}>
                                        <Toast.Header >
                                            <strong >Add new category</strong>
                                        </Toast.Header>
                                        <Toast.Body>
                                            <InputGroup>

                                                <Form.Control
                                                    onChange={handleNewCategoryChange}
                                                    value={newCategory}
                                                    placeholder="New category"
                                                >
                                                </Form.Control>
                                                <Button
                                                    variant="outline-dark"
                                                    onClick={addCategory}
                                                    disabled={!newCategory}
                                                >
                                                    Add
                                                </Button>
                                            </InputGroup>

                                        </Toast.Body>

                                    </Toast>

                                    <Form.Group as={Row} controlId="descriptionInput">
                                        <Form.Label column sm={3}>Description</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Description"
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                required
                                            // onBlur={validateProductName}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="quentityInput">
                                        <Form.Label column sm={3}>Quentity</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="number"
                                                placeholder="Quentity"
                                                value={quentity}
                                                onChange={handleQuentityChange}
                                                required
                                            // onBlur={validatePassword}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="priceInput">
                                        <Form.Label column sm={3}>Price</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="number"
                                                placeholder="Price"
                                                value={price}
                                                onChange={handlePriceChange}
                                                required
                                            // onBlur={validatePassword}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="imageInput">
                                        <Form.Label column sm={3}>Image</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                onChange={handleImgFileChange}
                                                required
                                                type="file"
                                                name="image"
                                            />
                                        </Col>


                                    </Form.Group>
                                </Card.Body>

                                <Card.Footer>
                                    {loading && (
                                        <img src={loadingImg} className="App-loading" alt="loading" />
                                    )}
                                    <Button
                                        className="mt-3"
                                        variant="outline-dark"
                                        type="submit"
                                        block
                                        size="lg"
                                    //  disabled={!validateForm()}
                                    >
                                        Add product
                                    </Button>
                                    {/* {props.message} */}
                                    {props.message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {props.message}
                                            </div>
                                        </div>
                                    )}
                                </Card.Footer>
                            </Card>
                        </Form>
                    </Col>

                    <Col sm={12} lg={4}>
                        <Card className="mb-5" style={{ color: "black" }}>
                            {/* <div className="App-color-header">
                                New product
                            </div> */}
                            <Card.Header style={{ backgroundColor: "#ffd3c2" }}>
                                The new product
                            </Card.Header>
                            <Card.Img className="py-3 px-3" src={imgData} alt="" />
                            <Card.Body>
                                <Card.Title>
                                    <h3> {productName}</h3>
                                </Card.Title>
                                <Card.Text>
                                    <h3>Category: {category}</h3>
                                    <h4> price : {Number(price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$</h4>
                                    <h5>Units in Stock: {quentity}</h5>
                                    Description : {description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
}
)
