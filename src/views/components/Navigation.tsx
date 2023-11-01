import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useUserContext from '../../controllers/context/userContext/useUserContext';
import useItemsContext from '../../controllers/context/itemContext/useItemsContext'
import { handleLogout } from '../../controllers/LoginScreen/loginScreenController';
import { useHistory } from 'react-router-dom';
import Redbell from '../../assets/svg/notification-14158.svg';
import WhiteBell from '../../assets/svg/notification-bell-13079.svg';
import styled from 'styled-components';
import { useEffect, useState } from 'react'
import Observer from '../../models/Observer'
import Item from '../../models/Item'
import { AlertTypes, ItemStates, UserTypes, Observers, Notifications } from '../../../constants'


const Navigation = () => {
  
  // create new observer
  const [observer] = useState<Observer>(new Observer({id: Observers.NOTIFY, 
    update: (show: boolean) => {
    // Update the component's local items state
    setShowRedBell(show);
  }}))

  // watches for item changes
  // const [observer] = useState<Observer>(new Observer({id: Observers.NAV, 
  //   update: (newItems: Item[]) => {
  //   handleChangedItems(items)
  // }}))  

  const [items, handleChangedItems] = useState<Item[]>([])
  const [showWhiteBell, setShowWhiteBell] = useState<boolean>(true)
  const [showRedBell, setShowRedBell] = useState<boolean>(false)
  
  const itemsSubject = useItemsContext()
  useEffect(() => {
    // build observers 
    if (itemsSubject) {
      // attach to current observer for calling upddate
      itemsSubject.attach(observer);
      // run this when component unmounts
      return () => {
        itemsSubject.detach(observer);
      };
    }
  }, []);

  // this fetches the items
  useEffect(() => {
    // call notify on load for init to get items - calls a different observer 
    itemsSubject.notify(observer?.id, Notifications.GET_ITEMS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSubject.observersArr])

  const handleIcon = () => {
    
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <IconContainer>
            {showWhiteBell ? <img src={WhiteBell} alt="White Bell" /> : null}
            {showRedBell ? <Nav.Link href='' onClick={() => handleIcon()}><img src={Redbell} alt="Red Bell" /></Nav.Link> : null}
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