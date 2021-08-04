import React, { useState } from 'react';
import { CardElement, CardExpiryElement, CardCvcElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import validator from 'validator';


export default function CheckoutForm(props) {

    const stripe = useStripe();
    const elements = useElements();
    const [nameOnCard, setNameOnCard] = useState('')
    const [isValidNameOnCard, setIsValidNameOnCard] = useState(true)
    const [isValidForm, setIsValidForm] = useState(false)

    const handleNameOnCardChange = event => {
        setNameOnCard(event.target.value)
    };

    const validateNameOnCard = () => {
        setIsValidNameOnCard(true)
        setIsValidForm(true)
        console.log(isValidForm);
        console.log(isValidNameOnCard && stripe);
        if (nameOnCard.includes(' ')) {
            let nameOnCardStrings = nameOnCard.split(' ');
            console.log(nameOnCardStrings);
            for (const s of nameOnCardStrings) {
                if (!validator.isAlpha(s))
                    setIsValidNameOnCard(false)
                setIsValidForm(false)
            }
        } else {
            setIsValidNameOnCard(false)
            setIsValidForm(false)
        }
        console.log(isValidForm);

    }
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '25px',
                                color: 'black',                                
                                '::placeholder': {
                                    color: '#aab7c4',

                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </Form.Group>

            <Form.Group controlId="formBasicUserName">
                {/* <Form.Label>Name on the card</Form.Label> */}
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Name on the card"
                    value={nameOnCard}
                    onChange={handleNameOnCardChange}
                    required
                    onBlur={validateNameOnCard}
                />
                {!isValidNameOnCard ?
                    <div className="alert alert-danger" role="alert">
                        Must contain at least 2 strings, cannot contain numbers and symbols.
                    </div>
                    : <div></div>}
            </Form.Group>
            {/* 
             */}
            <Button className="mt-5" variant="outline-dark" size="lg" block type="submit" disabled={!isValidNameOnCard}>
                Pay ${props.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Button>
        </Form>
    );
};