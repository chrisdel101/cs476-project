import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import useUserContext from '../../controllers/context/userContext/useUserContext'
import useItemsContext from '../../controllers/context/itemContext/useItemsContext'
import { handleLogout } from '../../controllers/LoginScreen/loginScreenController'
import { useHistory, useLocation } from 'react-router-dom'
import Redbell from '../../assets/svg/notification-14158.svg'
import WhiteBell from '../../assets/svg/notification-bell-13079.svg'
import FreeBeeLogo from '../../assets/freebeelogoresize.png'
import BeeLogo from '../../assets/receiverlogoresize.png'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Observer from '../../models/Observer'
import { Notifications, Observers, Routes, UserTypes } from '../../../constants'

import Item from '../../models/Item'
import {
  handleHideIcon,
  handleShowIcon,
} from '../../controllers/Navigation/navigationController'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const Navigation = () => {
  const location = useLocation();
  const { currentUser } = useUserContext()
  const [usersItems, setUsersItems] = useState<Item[] | []>([])
  const [observer] = useState<Observer>(
    new Observer({
      id: Observers.NAV,
      update: (items: Item[]) => {
        setUsersItems(items)
      },
    })
  )
  const [toolTipText, setToolTipText] = useState<string|undefined>("") 
  const [showWhiteBell, setShowWhiteBell] = useState<boolean>(true)
  const [showRedBell, setShowRedBell] = useState<boolean>(false)
  const itemsSubject = useItemsContext()
  useEffect(() => {
    if (itemsSubject) {
      // attach to current observers on
      itemsSubject.attach(observer)
      // run this when component unmoounts
      return () => {
        itemsSubject.detach(observer)
      }
    }
  })
  useEffect(() => {
    const currentPath = location?.pathname;
    if(currentPath && currentPath === Routes.Account) {
      setShowWhiteBell(false)
      setShowWhiteBell(true)
      setToolTipText(undefined)
    }
  }, []);
 
  useEffect(() => {
    // loads all users item onto the page on load
    itemsSubject.notify(
      observer?.id,
      Notifications.GET_ITEMS_BY_USER,
      currentUser
    )

    //
    // - check delays on these
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSubject.isLoaded, currentUser])

  useEffect(() => {
    if (usersItems.length) {
      // check to see which item should be shown
      handleShowIcon({ items: usersItems, setShowRedBell, setShowWhiteBell, setToolTipText })
      // loop over items and check if state is changed
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersItems])

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{ minHeight: '75px' }}
    >
     
      <Container>
      {currentUser?.userType === UserTypes.RECEIVER ?
      <IconToolTip title={toolTipText} id="ic-tooltip">
        <IconContainer
          id="icon-container"
          onClick={() =>
            handleHideIcon({
              items: usersItems,
              setShowRedBell,
              setShowWhiteBell,
              setToolTipText
            })
          }
        >
         
        
          {showWhiteBell ? (
            <img src={WhiteBell} alt="an unalerted bell icon" />
          ) : null}
          {showRedBell ? (
            <img src={Redbell} alt="an alerted bell icon" />
          ) : null}
        </IconContainer>
       
          
         </IconToolTip>
         : null
      }
        <LogoContainer>
          {/* conditionally render logo based on user type, etc */}
          <img src={BeeLogo} alt="Your SVG" />
        </LogoContainer>
        <Navbar.Brand href="/">
          <img src={FreeBeeLogo} alt="FreeBee" width="auto" height="60"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavigationAuth />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
const IconToolTip = ({ id, children, title }: any) => (
  title ? (
    <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottom" id={  id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  ) : (
    // Replace 'onNewNonfatalIssuePublished' with the appropriate JSX or component
    <>{children}</>
  )
);

const NavigationAuth = () => {
  const { currentUser, setCurrentUser, setIsLoggedIn } = useUserContext()
  const history = useHistory()
  return currentUser ? (
    <>
      <Nav.Link href="account">My Account</Nav.Link>
      <Nav.Link
        onClick={() => handleLogout(history, setCurrentUser, setIsLoggedIn)}
      >
        Log Out
      </Nav.Link>
    </>
  ) : (
    <>
      <Nav.Link href={`/log_in/donor`}>Donor Login</Nav.Link>
      <Nav.Link href="/log_in/receiver">Receiver Login</Nav.Link>
    </>
  )
}
export default Navigation

const IconContainer = styled.div`
  height: 40px;
  width: 40px;
  margin-right: 15px;
`
const LogoContainer = styled.div`
  height: 40px;
  width: 40px;
  margin-right: 15px;
`
