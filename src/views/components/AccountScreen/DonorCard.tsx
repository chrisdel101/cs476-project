import styled from "styled-components";
import useUserContext from "../../../controllers/context/useUserContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import UserItemCard from "./UserItemCard";
import crudFunctions from "../../../api/crudFunctions";
import { useEffect, useState } from "react";
import Item from "../../../models/Item";

const Donor = () => {
  const {currentUser} = useUserContext();
  const [userItems, setUserITems] = useState<Item[]>([])

  useEffect(() => {
    (async () => {
      if(currentUser){
        const fetchedUserItems =  await crudFunctions.getItemsByUser(currentUser) 
        setUserITems(fetchedUserItems)
      }

    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <StyledContainer>
      <Styledh2>Donor Details</Styledh2>
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
        {userItems.map((item: Item, i: number) => {
          return(
            <Col md={6}>
              <UserItemCard item={item} key={i}/>
            </Col>
          )
          })
        }
      </CardsContainer>
      
    </StyledContainer>
  )
}
export default Donor

const CardsContainer = styled(Row)`
  margin-top: 2em;
`
const StyledContainer = styled(Container)`
  padding-top: 3em;
`
const Styledh2 = styled.h2`
  margin-bottom: 25px;
`