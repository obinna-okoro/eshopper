import React, { useContext } from 'react';
import Navbar from "react-bootstrap/Navbar"
import Badge from "react-bootstrap/Badge"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from './components/Home';
import ProductScreen from './components/ProductScreen';
import { Link } from 'react-router-dom';
import { Store } from './context/store';
import Cart from './components/Cart';
import Signin from './components/Signin';

const App = () => {
  const {state } = useContext(Store)

  const { cart } = state
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
     <header>
       <Navbar bg="dark" variant="dark">
        <Container>
        <LinkContainer to="/">
        <Navbar.Brand> eShopper</Navbar.Brand>
        </LinkContainer>

        <Nav className="me-auto">
          <Link to="/cart" className='nav-link'>
            Cart 
            {
              cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                </Badge>
              )
            }
          </Link>
        </Nav>

        </Container>

       </Navbar>
       
     </header>
     <main>
     <Container className='mt-3'>
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/product/:slug' element={<ProductScreen/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/signin' element={<Signin/>}/>
       </Routes>
       </Container>
    </main>
 
    <footer>
      <div className='text-center'>All rights reserved</div>
    </footer>
    </div>
    </BrowserRouter>
 );     
}

export default App;

