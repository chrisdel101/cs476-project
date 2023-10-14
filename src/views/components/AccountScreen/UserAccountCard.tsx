import styled from "styled-components";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Item from "../../../models/Item";
import Receiver from "../../../models/Receiver";
import UserItemCard from "./UserItemCard";
import { capitalizeFirstLetter } from "../../../utilities/utils";

interface IProps {
  currentUser: Receiver
  userItems: Item[]
  setShowUpsertItemModal: (show: boolean) => void
  setSelectedItem: (item: Item | undefined) => void
}
const UserAccountCard = ({currentUser, userItems, setShowUpsertItemModal, setSelectedItem}: IProps) => {
  const userType = capitalizeFirstLetter(currentUser.userType); 

  return (
    <StyledContainer>
      <Styledh2>{userType} Details</Styledh2>
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
      <CardsContainer className='card-container'>       
        {userItems?.map((item: Item, i: number) => {
          return(
            <Col md={6} key={i}>
              <UserItemCard 
              item={item}
              setShowUpsertItemModal={setShowUpsertItemModal}
              setSelectedItem={setSelectedItem}
              />
            </Col>
          )
          })
        }
      </CardsContainer>
  
    </StyledContainer>
  )
}
export default UserAccountCard;

const CardsContainer = styled(Row)`
  margin-top: 2em;
`
const StyledContainer = styled(Container)`
  margin: 0 7em;
  padding-top: 3em;
`
const Styledh2 = styled.h2`
  margin-bottom: 25px;
`