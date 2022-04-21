import React, { useContext } from 'react';
import Navbar from "react-bootstrap/Navbar"
import Badge from "react-bootstrap/Badge"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
import ShippingAddress from './components/ShippingAddress';
import SignUp from './components/SignUp';
import PaymentMethod from './components/PaymentMethod';
import PlaceOrder from './components/PlaceOrder';
import OrderStatus from './components/OrderStatus';

const App = () => {
  const {state, dispatch: ctxDispatch } = useContext(Store)

  const { cart, userInfo } = state

  const signoutHandler = () => {
    ctxDispatch({type: "USER_SIGNOUT"});
    localStorage.removeItem("userInfo")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
  }
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
      <ToastContainer position="bottom-center" limit={1} />
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
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <LinkContainer to={"/profile"}>
                <NavDropdown.Item>
                  User Profile
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/orderhistory"}>
                <NavDropdown.Item>
                  Order History
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <Link className='dropdown-item' to={"#signout"} onClick={signoutHandler}>
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <Link className="nav-link" to="/signin"> 
            Sign In 
            </Link>
          )}
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
         <Route path='/shipping' element={<ShippingAddress/>}/>
         <Route path='/signup' element={<SignUp/>}/>
         <Route path='/payment' element={<PaymentMethod/>}/>
         <Route path='/placeorder' element={<PlaceOrder/>}/>
         <Route path='/order/:id' element={<OrderStatus/>}/>
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

