import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Item from '../../../models/Item'
import { ItemStates } from '../../../../constants'
import {
  handleAcceptItem,
  handleRejectItem,
} from '../../../controllers/AccountScreen/manageItemController'
import useUserContext from '../../../controllers/context/useUserContext'
import { useState } from 'react'

interface IProps {
  item: Item
}

const UserItemCard = ({ item }: IProps) => {
  const { currentUser } = useUserContext()
  

  const addedAtTimeStamp = new Date(item.addedAtTimeStamp);
  const day  = addedAtTimeStamp.getDate()
  const month = addedAtTimeStamp.getMonth() + 1 // Months are zero-based, so add 1
  const year = addedAtTimeStamp.getFullYear()
  const hour = addedAtTimeStamp.getHours()
  const minute = addedAtTimeStamp.getMinutes()

  return (
    <StyledCard bg={item.itemState === ItemStates.PENDING ? 'success' : ""}>
    <Card.Img src={'https://placekitten.com/100/100'} />
      <Card.Body className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <Card.Title>
                <span>Item Name: </span>
                {item?.name}
              </Card.Title>
              <p className="card-text">
                <span>Description: </span>
                {item?.description}
              </p>
              <p className="card-text">
                <span>Status: </span>
                {item?.itemState}
              </p>
              {item.receiverId ? 
                <p className="card-text">
                  <span>Reciever: </span>
                  {item?.receiverId}
                </p>
                : null
              }
              <p className="card-text">
                <small className="text-muted">Date posted: </small>
                <small className="text-muted">
                  {`${day}-${month}-${year} ${hour}:${minute}`}
                </small>
              </p>
            <ButtonContainer>

            <StyledButton
              variant="primary"
              onClick={() => handleAcceptItem(item, currentUser)}
            >
              Accept Request
            </StyledButton>
            <StyledButton
              variant="primary"
              onClick={() => handleRejectItem(item, currentUser)}
            >
              Accept Request
            </StyledButton>
            </ButtonContainer>
      </Card.Body>
    </StyledCard>
  )
}

export default UserItemCard
const StyledCard = styled(Card)`
    // border: grey solid 1px; 
    width: 350px;
    height: 625px;
    margin: 10px 0;
`
// organizes the button content of the item card
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
// standardizes the buttons used on this page
const StyledButton = styled(Button)<any>`
  width: 150px;
  align-self: center;
`
