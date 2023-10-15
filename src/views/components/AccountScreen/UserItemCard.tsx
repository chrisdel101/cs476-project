import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Item from '../../../models/Item'
import { ItemStates, UserTypes } from '../../../../constants'
import {
  handleAcceptItem,
  handleCancelRequest,
  handleClaimItem,
  handleDeleteDonation,
  handleRejectItem,
} from '../../../controllers/AccountScreen/donationController'
import useUserContext from '../../../controllers/context/userContext/useUserContext'

interface IProps {
  item: Item
  setShowUpsertItemModal: (show: boolean) => void
  setSelectedItem: (item: Item | undefined) => void
}

const UserItemCard = ({ item, setShowUpsertItemModal,setSelectedItem }: IProps) => {
  const { currentUser } = useUserContext()

  const addedAtTimeStamp = new Date(item.addedAtTimeStamp)
  const day = addedAtTimeStamp.getDate()
  const month = addedAtTimeStamp.getMonth() + 1 // Months are zero-based, so add 1
  const year = addedAtTimeStamp.getFullYear()
  const hour = addedAtTimeStamp.getHours()
  const minute = addedAtTimeStamp.getMinutes()

  return (
    <StyledCard
      bg={
        currentUser?.userType === 'donor'
          ? item.itemState === ItemStates.PENDING
            ? 'success'
            : item.itemState === ItemStates.DONATED
            ? 'primary'
            : item.itemState === ItemStates.CLAIMED
            ? 'warning'
            : ''
          : ''
      }
    >
      <Card.Img src={'https://placekitten.com/100/100'} />
      <Card.Body
        className="card-body"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
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
          {item?.itemState?.toUpperCase()}
        </p>
        {item.receiverId ? (
          <p className="card-text">
            <span>Reciever: </span>
            {item?.receiverId}
          </p>
        ) : null}
        <p className="card-text">
          <small className="text-muted">Date posted: </small>
          <small className="text-muted">
            {`${day}-${month}-${year} ${hour}:${minute}`}
          </small>
        </p>
        {currentUser && currentUser.userType === UserTypes.DONOR ? (
          // Block for DONOR user
          item.itemState === ItemStates.PENDING ? (
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
                Reject Request
              </StyledButton>
            </ButtonContainer>
          ) : item.itemState === ItemStates.DONATED ? (
            <ButtonContainer>
              <StyledButton
                variant="secondary"
                onClick={() => handleClaimItem(item, currentUser)}
              >
                Item Claimed
              </StyledButton>
              <StyledButton
                variant="secondary"
                onClick={() => handleCancelRequest(item, currentUser)}
              >
                Cancel Donation
              </StyledButton>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
            <StyledButton
              variant="secondary"
              onClick={() => {setShowUpsertItemModal(true); setSelectedItem(item)}}>
              Update Donation
            </StyledButton>
            <StyledButton
              variant="secondary"
              onClick={() => handleDeleteDonation(item, currentUser)}>
              Delete Donation
            </StyledButton>
            </ButtonContainer>
          )
        ) : (
          // Block for receiver user
          <ButtonContainer>
            <StyledButton
              variant="secondary"
              onClick={() => handleCancelRequest(item, currentUser)}
            >
              Cancel Donation
            </StyledButton>
          </ButtonContainer>
        )}
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
  justify-content: space-evenly;
`
// standardizes the buttons used on this page
const StyledButton = styled(Button)<any>`
  width: 150px;
  align-self: center;
`
