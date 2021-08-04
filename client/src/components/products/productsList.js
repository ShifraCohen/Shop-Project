import React from "react";
import Product from "./product";
import { CardColumns, InputGroup, FormControl } from "react-bootstrap";
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import '../../App.css'
export default function ProductsList(props) {
    const [filteredProductNodes, setFilteredProductNodes] = useState()
    const [searchVal, setSearchVal] = useState('')
    // const [category, setCategory] = useState('')

    let temp = [...Array.from(props.products).map((p) => {
        return (<Product key={p._id} product={p} ></Product>)
    })]
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
        await props.getProductsByCategoryId(e.target.id);

        setFilteredProductNodes([...Array.from(props.productsFilteredByCategory)
            // .filter((p) =>
            //     p.category.name === val)
            .map((p) => { return <Product key={p._id} product={p}></Product> })
        ])
    };
    return (
        <div >
            <InputGroup size="lg" className="my-4">
                {/* <img width="80px" src={search} alt=""></img> */}
                <FormControl
                    required
                    as="select"
                    onChange={handleCategoryChange}
                // value={category}
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
        </div>
    );
}
