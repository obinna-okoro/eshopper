import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from "react-bootstrap/Form"
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Store } from '../context/store'
import CheckoutSteps from './CheckoutSteps'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


const PlaceOrder = () => {

    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)

    const { userInfo, cart } = state

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //123.2345 => 123.23

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    cart.shippingPrice = round2(0.15 * cart.itemsPrice) 


    cart.taxPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const placeOrderHandler = async (e) => {

    };

    useEffect(() => {
        if(!cart.paymentMethod){
            navigate("/payment")
        }
    }, [cart, navigate])


  return (
    <div>
         <CheckoutSteps step1 step2 step3></CheckoutSteps>
        {/* <div className="container small-container"> */}
        <Helmet>
            <title>Preview Order</title>
        </Helmet>
        <h1 className='my-3'>Preview Order</h1>
        <Row>
            <Col md={8}>
<Card className="mb-3">
    <Card.Body>
        <Card.Title>
            Shipping
        </Card.Title>
        <Card.Text>
    <strong>Name:</strong>{cart.shippingAddress.fullName} <br/>
    <strong>Address:</strong>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
    {cart.shippingAddress.country} 
        </Card.Text>
        <Link to="/shipping">Edit</Link>
    </Card.Body>
</Card>
<Card className="mb-3">
    <Card.Body>
        <Card.Title>
            Payment
        </Card.Title>
        <Card.Text>
    <strong>Method:</strong>{cart.paymentMethod} <br/>
        </Card.Text>
        <Link to="/payment">Edit</Link>
    </Card.Body>
    </Card>
    <Card className="mb-3">
    <Card.Body>
        <Card.Title>
            Items
        </Card.Title>
        <ListGroup variant='flush'>
            {cart.cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                    <Row className='align-items-center'>
                        <Col md={6}>
                            <img src={item.image} alt={item.name}
                            className="img-fluid rounded img-thumbnail"/> {" "}
                             <Link to={`product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3} ><span>{item.quantity}</span></Col>
                        <Col md={3} ><span>{item.price}</span></Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
        <Link to="/cart">Edit</Link>
    </Card.Body>
</Card>

</Col>

<Col md={4}>
    <Card>
        <Card.Body>
            <Card.Title>Order Summary</Card.Title>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Items</Col>
                        <Col>${cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>${cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col><strong>Order Total</strong></Col>
                        <Col><strong>${cart.totalPrice.toFixed(2)}</strong></Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="d-grid">
                        <Button
                        type='button'
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                        >
                            Place Order
                        </Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
</Col>
</Row>
        {/* </div> */}
    </div>
  )
}

export default PlaceOrder