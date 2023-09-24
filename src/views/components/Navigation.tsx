import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import isLoggedIn from "../../controllers/hooks/authenitication/useUserSessions"
import User from '../../models/abstractClasses/User';

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">FreeBee</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/log_in/giver">Giver Login</Nav.Link>
            <Nav.Link href="/log_in/reciever">Reciever Login</Nav.Link>
            <Nav.Link href="#accont">Account</Nav.Link>
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

const NavigationAuth = (user: User) => {
  return (
    isLoggedIn()
      ? (
        <>
          <Nav.Link href={`/log_in/${user.userType}`}>Log Out</Nav.Link>
          <Nav.Link href="/log_out/reciever">Receiver Login</Nav.Link>
        </>
      )
      : (
        <>
          <Nav.Link href={`/log_in/$`}>Giver Login</Nav.Link>
          <Nav.Link href="/log_in/reciever">Receiver Login</Nav.Link>
      </>
      )
  );
  
  
}
export default Navigation;