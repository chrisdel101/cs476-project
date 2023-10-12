import styled from "styled-components";
import useUserContext from "../../../controllers/context/useUserContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ItemCard from "../IndexScreen/ItemCard";
import crudFunctions from "../../../api/crudFunctions";
import { useEffect, useState } from "react";
import Item from "../../../models/Item";

const Donor = () => {
  const {currentUser} = useUserContext();
  const [userItems, setUserITems] = useState<Item[]>([])
  useEffect(() => {
    (async () => {
      // fetch items test
      if(currentUser){
        const userItems =  await crudFunctions.getItemsByUser(currentUser) 
        setUserITems(userItems)
      }

    })()
  },[])
  return (
    <StyledContainer fluid>
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
      

      <div>
       
        {userItems.map((item) => {
          return <ItemCard item={item}/>
          })
        }
      </div>
      
    </StyledContainer>
  )
}
export default Donor

const StyledContainer = styled(Container)`
  margin: 0 7em;
  padding-top: 3em;
`
const Styledh2 = styled.h2`
  margin-bottom: 25px;
`