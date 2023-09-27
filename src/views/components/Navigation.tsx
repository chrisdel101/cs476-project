import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useUserContext from '../../controllers/context/useUserContext';
import { handleLogout } from '../../controllers/LoginScreen/loginScreenController';
import { useHistory } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">FreeBee</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavigationAuth />
            {/* DELETE IF UNUSED */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const NavigationAuth = () => {
  const {currentUser, setCurrentUser, setIsLoggedIn} = useUserContext();
  const history = useHistory();
  return (
    currentUser
      ? (
        <>
          <Nav.Link href="#accont">My Account</Nav.Link>
          <Nav.Link onClick={() => handleLogout(history, setCurrentUser, setIsLoggedIn)} >Log Out</Nav.Link>
        </>
      )
      : (
        <>
          <Nav.Link href={`/log_in/giver`}>Giver Login</Nav.Link>
          <Nav.Link href="/log_in/reciever">Receiver Login</Nav.Link>
      </>
      )
  );
  
  
}
export default Navigation;