import { withRouter } from 'react-router';
import React, { useContext } from 'react';
import { Button, Col, Row, AccordionContext } from 'react-bootstrap';

export default withRouter(function MyCustomToggle(props) {

    const confirmAddress = () => {

        
        props.history.push('/payments')
    }

    const currentEventKey = useContext(AccordionContext); // <-- Will update every time the eventKey changes.
    const isCurrentEventKey = currentEventKey === props.eventKey;
    return (
        <Row className={isCurrentEventKey ? "card-header py-0" : "card-footer py-0"} >
            <Col className="p-2">
                {props.streetAddress}, {props.city}...
            </Col >
            <Col className="p-2" lg={3} md={3} sm={4} xs={5} >
                <Button block variant="outline-dark" onClick={confirmAddress}> Use this address  </Button>
            </Col>
        </Row>
    );
})
