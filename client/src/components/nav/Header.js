import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {auth} from '../../firebaseFile';
import firebase from 'firebase/compat/app';
import { Search } from '../forms/Search';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
// import {useHistory} from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let {user, cart} = useSelector((state) => ({...state}))
  const navigateToHome = () =>{
    navigate('/')
  }
  const navigateToRegister = () =>{
    navigate('/register')
  }

  const navigateToLogin = () =>{
    navigate('/login')
  }
  const navigateToShop = () =>{
    navigate('/shop')
  }

  const navigateToCart = () =>{
    navigate('/cart')
  }

  const logout = () =>{
    firebase.auth().signOut()
    dispatch({
      type: "LOGOUT",
      payload: null,
    })
    navigate('/login')
  }

  const handleRedierectAdmin = () =>{
    navigate('/admin/dashboard')
  }
  const handleRedierectUser = () =>{
    navigate('/user/history')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link to='/' onClick={navigateToHome}>Home</Nav.Link>
            <Nav.Link to='/shop' onClick={navigateToShop} ><FaShoppingBag />&nbsp;Shop</Nav.Link>
            {
              (
                <Nav.Link to='/cart' onClick={navigateToCart} ><FaShoppingCart /> &nbsp;Cart&nbsp;<Badge>{cart.length}</Badge></Nav.Link>
              )
            }
          </Nav>
          
          {
            user &&
            <Nav>
              <span className='float-right p-1' >
                <Search />
              </span>
              <NavDropdown title={user.email && user.email.split('@')[0]} id="basic-nav-dropdown" style={{float: 'right'}} className=''>
                
              { user && user.role==='subscriber' && (
                <NavDropdown.Item>
                <Nav.Link onClick={handleRedierectUser}>Dashboard</Nav.Link>
                </NavDropdown.Item>
                )
              }
              { user && user.role==='admin' && (
                <NavDropdown.Item>
                <Nav.Link onClick={handleRedierectAdmin}>Dashboard</Nav.Link>
                </NavDropdown.Item>
                )
              }
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                Logout
              </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            }
          {!user && 
          <Nav>
            <span className='float-right p-1' >
                <Search />
              </span>
          <Nav.Link className='pull-right d-flex' onClick={navigateToRegister}>Register</Nav.Link>
          <Nav.Link className='pull-right d-flex' onClick={navigateToLogin}>Login</Nav.Link>
          </Nav>
          }
          
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}
