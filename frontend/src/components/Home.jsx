import React, {useReducer, useEffect} from 'react'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"
import logger from "use-reducer-logger"
import Product from './Product'
import { Helmet } from 'react-helmet-async'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
// import data from '../data'


const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, products: action.payload, loading:false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
            default:
                return state;
    }
}

const Home = () => {

// const [products, setProducts] = useState([])

const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
});

useEffect(() => {
    const fetchData = async () => {
        dispatch({type: 'FETCH_REQUEST'})

        try {
            const result = await axios.get("/api/products");
            dispatch({type: 'FETCH_SUCCESS', payload: result.data})
        } catch (error) {
            dispatch({type: 'FETCH_FAIL', payload: error.message})
        }
        
        // setProducts(result.data)
    };
    fetchData()
}, [])

  return (
    <div>
        <Helmet>
            <title>eShopper</title>
        </Helmet>
         <h1>Trending Products</h1>
    <div className='products'>
    {   loading? <LoadingBox/>
    :
    error? <MessageBox variant="danger">{error}</MessageBox>
    :
         (
            <Row> 
            {products.map(product => (
                <Col sm={6} md={4} lg={3} className="mb-3">
          <Product key={product.slug} product={product}></Product>
           </Col>
         ))}
         </Row>
         )
       }
    </div>
    </div>
  )
}

export default Home