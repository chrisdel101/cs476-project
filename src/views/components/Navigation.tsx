import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useUserContext from '../../controllers/context/userContext/useUserContext';
import { handleLogout } from '../../controllers/LoginScreen/loginScreenController';
import { useHistory } from 'react-router-dom';
import Redbell from '../../../public/assets/svg/notification-14158.svg';
import WhiteBell from '../../../public/assets/svg/notification-bell-13079.svg';
import styled from 'styled-components';
import { useState } from 'react';

const Navigation = () => {
  const [showWhiteBell, setShowWhiteBell] = useState<boolean>(true)
  const [showRedBell, setShowRedBell] = useState<boolean>(false)
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <IconContainer>
          {showWhiteBell ? <img src={WhiteBell} alt="Your SVG" /> : null}
          {showRedBell ? <img src={Redbell} alt="Your SVG" /> : null}
        </IconContainer>
        <Navbar.Brand className="flex-grow-1" href="/">FreeBee</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavigationAuth />
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
          <Nav.Link href="account">My Account</Nav.Link>
          <Nav.Link onClick={() => handleLogout(history, setCurrentUser, setIsLoggedIn)} >Log Out</Nav.Link>
        </>
      )
      : (
        <>
          <Nav.Link href={`/log_in/donor`}>Donor Login</Nav.Link>
          <Nav.Link href="/log_in/receiver">Receiver Login</Nav.Link>
      </>
      )
  );
  
  
}
export default Navigation;

const IconContainer = styled.div`
  height: 40px;
  width: 40px;
  margin-right: 15px;

`