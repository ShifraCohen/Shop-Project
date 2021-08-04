import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

export default function ProductModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className="mb-2" style={{ color: "black" }}>
                    <Card.Img src={props.imgSrc} alt="" />
                    <Card.Body>
                        <h3> {props.name}</h3>
                        <h4> price :{props.price}$</h4>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    );
}
