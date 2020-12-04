import {useState} from 'react'
import { connect } from "react-redux";
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";

import {changeLoginForm, changeSignupForm} from '../../actions/auth'
import Login from '../auth/Login'
import Register from '../auth/Register'


const TopNavbar = () => {
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)


  return (
  //   <Navbar bg="light" expand="lg" cl>
  //     <NavDropdown title="Dropdown" id="basic-nav-dropdown">
  //       <NavDropdown.Item href="#action/3.1">Find Matching Internship</NavDropdown.Item>
  //       <NavDropdown.Item href="#action/3.2">Hire Right Talent</NavDropdown.Item>
  //       <NavDropdown.Item href="#action/3.3">Work from Home</NavDropdown.Item>
  //       <NavDropdown.Item href="#action/3.3">Pricing</NavDropdown.Item>
  //       <NavDropdown.Item href="#action/3.3">About Us</NavDropdown.Item>
  //       <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
  //       <NavDropdown.Item href="/login">Login</NavDropdown.Item>


  //     </NavDropdown>
  //     <Navbar.Brand href="#home">Instant Apply</Navbar.Brand>
  //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //     <Navbar.Collapse id="basic-navbar-nav">
  //       <Nav className="mr-auto">
  //         <Nav.Link href="#home">Home</Nav.Link>
  //         <Nav.Link href="#link">Link</Nav.Link>
  //       </Nav>
  //       <Form inline>
  //         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
  //         <Button variant="outline-success">Search</Button>
  //       </Form>
  //     </Navbar.Collapse>
  //   </Navbar>
  // );
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
  <a type='button' type= 'button'onClick={()=>setLogin(!login)}  className='login-nav'> Login</a>

  <h1 className='main-text'>Apply and hear back every time</h1>
  <div className='get-started-back'>
  <a type='button' className='get-started' onClick={()=>setSignup(!signup)}>Get Started</a></div>
  {
   login &&  !signup && <Login/>
  }
  {
    signup && !login && <Register/>
  }

  </div>
  )
};

// const mapStateToProps = state =>({
//   auth: state.auth
// })

export default connect()(TopNavbar);
