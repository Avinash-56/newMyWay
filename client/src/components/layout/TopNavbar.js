import {useState} from 'react'
import { connect } from "react-redux";
import {
  NavDropdown,
} from "react-bootstrap";

import {changeLoginForm, changeSignupForm} from '../../actions/auth'
import Login from '../auth/Login'
import Register from '../auth/Register'


const TopNavbar = () => {
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)


  return (
   <div class="navbar">
    <div class="Icon"></div>
    <div class="dropdown"> For you
    <br/>
    <NavDropdown title="" id="basic-nav-dropdown">
  <NavDropdown.Item href="#action/3.1">Find Matching Internship</NavDropdown.Item>
  <NavDropdown.Item href="#action/3.2">Hire Right Talent</NavDropdown.Item>
  <NavDropdown.Item href="#action/3.3">Work from Home</NavDropdown.Item>
  </NavDropdown></div>
  <a type='button' className='instant-apply'>Instant Apply</a>
  <a type='button' className='pricing'>Pricing</a>
  <a type='button' className='about'>About Us</a>
  <a type='button' type='button' className='signup-nav' onClick={()=>setSignup(!signup)}>SIGN UP</a>
  <a type='button' type= 'button' onClick={()=>setLogin(!login)}  className='login-nav'> Login</a>

  <h1 className='main-text'>Apply and hear back every time</h1>
  <div className='get-started-back'>
  <a type='button' className='get-started' onClick={()=>setSignup(!signup)}>Get Started</a></div>
  {
   login  && <Login/>
  }
  {
    signup && <Register/>
  }

  </div>
  )
};

// const mapStateToProps = state =>({
//   auth: state.auth
// })

export default (TopNavbar);
