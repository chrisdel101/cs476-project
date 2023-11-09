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
import useItemsContext from '../../../controllers/context/itemContext/useItemsContext'

interface IProps {
  item: Item
  setShowUpsertItemModal: (show: boolean) => void
  setSelectedItem: (item: Item | undefined) => void
}

const UserItemCard = ({
  item,
  setShowUpsertItemModal,
  setSelectedItem,
}: IProps) => {
  const { currentUser } = useUserContext()
  const { notify } = useItemsContext()
  const addedAtTimeStamp = new Date(item.addedAtTimeStamp ?? new Date())
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
          : currentUser?.userType === UserTypes.RECEIVER
          ? item.itemState === ItemStates.PENDING
            ? 'info'
            : item.itemState === ItemStates.DONATED
            ? 'primary'
            : item.itemState === ItemStates.CLAIMED
            ? 'success'
            : ''
          : ''
      }
    >
      <Card.Img src={item.image === 'default' || item.image === undefined ? 'https://placekitten.com/100/100' : item.image} style={{width: '100%', height: '15vw', objectFit: 'cover'}}/>
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
        <Card.Text>
          <small>Item Region: </small>
          <small>
            {item?.location?.toUpperCase()}
          </small>
        </Card.Text>
        <Card.Text>
          <span>Description: </span>
          {item?.description}
        </Card.Text>
        <Card.Text>
          <span>Status: </span>
          {item?.itemState?.toUpperCase()}
        </Card.Text>
        {item.receiverId ? (
          <Card.Text>
            <span>Reciever: </span>
            {item?.receiverId}
          </Card.Text>
        ) : null}
        {item.itemState === ItemStates.DONATED ? 
          <StyledCardText>
            <strong>
              <span>Pickup Address: </span>
            {item?.pickupAddress || "No pickup address was provided. Please contact the donor."}
              </strong>
            </StyledCardText>
          : null
        }
        <Card.Text>
          <small className="text-muted">Date posted: </small>
          <small className="text-muted">
            {`${day}-${month}-${year} ${hour}:${minute}`}
          </small>
        </Card.Text>
        {currentUser && currentUser.userType === UserTypes.DONOR ? (
          // Block for DONOR user
          item.itemState === ItemStates.PENDING ? (
            <ButtonContainer>
              <StyledButton
              className="me-2"
                variant="primary"
                onClick={() => handleAcceptItem({ item, notify, currentUser })}
              >
                Accept Request
              </StyledButton>
              <StyledButton
                variant="primary"
                onClick={() => handleRejectItem({ item, notify, currentUser })}
              >
                Reject Request
              </StyledButton>
            </ButtonContainer>
          ) : item.itemState === ItemStates.DONATED ? (
            <ButtonContainer>
              <StyledButton
              className="me-2"
                variant="secondary"
                onClick={() => handleClaimItem({ item, notify, currentUser })}
              >
                Item Claimed
              </StyledButton>
              <StyledButton
                variant="secondary"
                onClick={() =>
                  handleCancelRequest({ item, notify, currentUser })
                }
              >
                Cancel Donation
              </StyledButton>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <StyledButton className="me-2"
                variant="secondary"
                onClick={() => {
                  setShowUpsertItemModal(true)
                  setSelectedItem(item)
                }}
              >
                Update Donation
              </StyledButton>
              <StyledButton
                variant="secondary"
                onClick={() =>
                  handleDeleteDonation({ item, notify, currentUser })
                }
              >
                Delete Donation
              </StyledButton>
            </ButtonContainer>
          )
        ) : (
          // Block for receiver user
          <ButtonContainer>
            <StyledButton
              variant="secondary"
              onClick={() => handleCancelRequest({ item, notify, currentUser })}
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
  border: grey solid 1px;
  width: 350px;
  margin-bottom: 10px;
`
// organizes the button content of the item card
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
`
// standardizes the buttons used on this page
const StyledButton = styled(Button)<any>`
  width: 150px;
  align-self: center;
`
const StyledCardText = styled(Card.Text)`
  backdrop-filter: brightness(140%);
    border-radius: 1px;
    border: 1px solid #0d6efd;
    padding-left: 2px
`
