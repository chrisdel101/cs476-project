import styled from "styled-components";
import useUserContext from "../../../controllers/context/useUserContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Receiver = () => {
  const {currentUser} = useUserContext();
  return (
    <StyledContainer fluid>
      <Styledh2>Receiver Details</Styledh2>
      <Row>
        <Col xs={4}>Name:</Col>
        <Col xs={4}>{currentUser?.name}</Col>
      </Row>
      <Row>
        <Col xs={4}>Email:</Col>
        <Col xs={4}>{currentUser?.email}</Col>
      </Row>
      {(currentUser?.phone ?
        <Row>
          <Col xs={4}>Phone:</Col>
          <Col xs={4}>{currentUser?.phone}</Col>
        </Row>
        : null)
      }
      <Row>
        <Col xs={4}>Location:</Col>
        <Col xs={4}>{currentUser?.location}</Col>
      </Row>
  
    </StyledContainer>
  )
}
export default Receiver;

const StyledContainer = styled(Container)`
  margin: 0 7em;
  padding-top: 3em;
`
const Styledh2 = styled.h2`
  margin-bottom: 25px;
`