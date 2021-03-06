import axios from 'axios';
import React, { useContext, useReducer, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useNavigate , useParams} from 'react-router-dom';
import { Store } from '../context/store';
import { getError } from '../utils';
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'


function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return {...state, loading:true, error: ""};

     case "FETCH_SUCCESS":
                return {...state, loading: false, order: action.payload, error: "" };
            
    case "FETCH_FAIL": 
            return {...state, loading: false, error: action.payload}; 
    
    default:
                return state
        
    }
}


const OrderStatus = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store)

const { userInfo } = state

    const params = useParams()

    const {id: orderId} = params;

    const navigate = useNavigate()

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
    });


    useEffect(() => {

        const fetchOrder = async () => {
            try {
        const { data }= await axios.get(`api/orders/${orderId}`, {
            headers: { authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: "FETCH_SUCCESS", payload: data})
            } catch (error) {
            dispatch({type: "FETCH_FAIL", payload: getError(error)}) 
            }
        };
        if (!userInfo) {
            return navigate("/login")
        }

        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder()
        }
    }, [orderId, order._id, userInfo, navigate]);

  return  loading ? 
    (<LoadingBox></LoadingBox>) :

    error ? 
    (<MessageBox variant="danger">{error}</MessageBox>) :
   ( 
   <div>
         <Helmet>
            <title>Order {orderId}</title>
        </Helmet>
        <h1 className='my-3'>Order {orderId}</h1>
        <Row>
            <Col md={8}>
            <Card className="mb-3">
    <Card.Body>
        <Card.Title>
            Shipping
        </Card.Title>
        <Card.Text>
    <strong>Name:</strong>{order.shippingAddress.fullName} <br/>
    <strong>Address:</strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},
    {order.shippingAddress.country} 
        </Card.Text>

        {order.isDelivered ? (
            <MessageBox variant="success">
                Delivered at {order.deliveredAt}
            </MessageBox>
        ) : (
            <MessageBox variant="danger">Not Delivered</MessageBox>
        )}
        
    </Card.Body>
</Card>
<Card className="mb-3">
    <Card.Body>
        <Card.Title>
            Payment
        </Card.Title>
        <Card.Text>
    <strong>Method:</strong>{order.paymentMethod} <br/>
        </Card.Text>
        {
            order.isPaid ? (
                <MessageBox variant="success">
                    Paid at {order.paidAt}
                </MessageBox>
            ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
            )
        }
    </Card.Body>
    </Card>
    <Card className="mb-3">
    <Card.Body>
        <Card.Title>
            Items
        </Card.Title>
        <ListGroup variant='flush'>
            {order.cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                    <Row className='align-items-center'>
                        <Col md={6}>
                            <img src={item.image} alt={item.name}
                            className="img-fluid rounded img-thumbnail"/> {" "}
                             <Link to={`product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3} ><span>{item.quantity}</span></Col>
                        <Col md={3} ><span>{item.price} Euro</span></Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
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
                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col><strong>Order Total</strong></Col>
                        <Col><strong>{order.totalPrice.toFixed(2)} Euro</strong></Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
</Col>
        </Row>
   </div>
)
  
}

export default OrderStatus