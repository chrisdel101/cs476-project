import styled from "styled-components";
import useUserContext from "../../../controllers/context/useUserContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Donor = () => {
  const {currentUser, setCurrentUser, setIsLoggedIn} = useUserContext();
  console.log(currentUser);
  return (
    <Container fluid>
      <h2>Donor</h2>
      <Row>
        <Col>Name</Col>
        <Col>{currentUser?.name}</Col>
      </Row>
      <Row>
        <Col>Email</Col>
        <Col>{currentUser?.email}</Col>
      </Row>
      <Row>
        <Col>Phone</Col>
        <Col>{currentUser?.phone}</Col>
      </Row>
      <Row>
        <Col>Location</Col>
        <Col>{currentUser?.location}</Col>
      </Row>
  
    </Container>
  )
}
export default Donor

