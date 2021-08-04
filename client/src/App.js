import './App.css';
import { Provider } from 'react-redux'
import store from './Redux/Store/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation/navbar'
import Home from './components/home/home.js';
import About from './components/about/about.js';
import Products from './components/products/showAllProducts.js';
import Payments from './components/payments/payments.js';
import Shipping from './components/shipping/shipping.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';
import NewProduct from './components/products/newProduct';
// import PaymentDetails from './components/payments/paymentDetails';
// import Shipment from './components/payments/shipment';

export default function App() {

    return (
        <div className="App">
            <Provider store={store}>
                <Router>

                    <Navigation/>

                    <Switch>
                        <Route path="/products">
                            <header className="App-header">
                                <Products />
                            </header>
                        </Route>
                        <Route path="/about">
                            <header className="App-header">
                                <About />
                            </header>
                        </Route>


                        <Route path="/newProduct">
                            <header className="App-header">
                                <NewProduct/>
                            </header>
                        </Route>
                        <Route path="/payments">
                            <header className="App-header">
                                <Payments/>
                            </header>
                        </Route>
                        <Route path="/shipping">
                            <header className="App-header">
                                    <Shipping/> 
                            </header>
                        </Route>
                       
                        <Route path="/">
                            <header className="App-header">
                                <Home />
                            </header>
                        </Route>
                    </Switch>

                </Router>
            </Provider>
        </div>
    );
}







