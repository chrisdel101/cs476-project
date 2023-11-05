import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Item from '../../../models/Item'
import { handleRequestItem } from '../../../controllers/IndexScreen/requestItemController'
import useUserContext from '../../../controllers/context/userContext/useUserContext'
import { UserTypes } from '../../../../constants'

interface IProps {
  item: Item
}

const ItemCard = ({ item }: IProps) => {
  const { currentUser } = useUserContext()

  const addedAtTimeStamp = new Date(item.addedAtTimeStamp ?? new Date())
  const day = addedAtTimeStamp.getDate()
  const month = addedAtTimeStamp.getMonth() + 1 // Months are zero-based, so add 1
  const year = addedAtTimeStamp.getFullYear()
  const hour = addedAtTimeStamp.getHours()
  const minute = addedAtTimeStamp.getMinutes()

  // template for the card contents
  // if (currentUser) {
    return (
      // following the information at https://getbootstrap.com/docs/4.3/components/card/ but with the boostrap 5 card elements found at //https://react-bootstrap.netlify.app/docs/components/cards
      <StyledCard
        border="light">
        <Card.Body>
          <div className="row no-gutters">
            <ImgContainer className="col-md-3">
              {/* will need an image var here */}
              <StyledImg src={'https://placekitten.com/200/200'} />
            </ImgContainer>
            <TextContainer className="col-md-6">
              <div className="card-body">
                <Card.Title>Item Name: {item?.name}</Card.Title>
                <p className="card-text">Item description: {item?.description}</p>
                <p className="card-text">ITEM STATUS: {item?.itemState}</p>
                <p className="card-text">{item?.receiverId}</p>
                <p className="card-text">
                  <small className="text-muted">Date added: Date posted: </small>
                  <small className="text-muted">{`${day}-${month}-${year} ${hour}:${minute}`}</small>
                </p>
              </div>
            </TextContainer>
            {/* if item is available (checked before this function call), and the user is a receiver, user can request item */}
            {currentUser?.userType === UserTypes.RECEIVER ? (
              <StyledContainer className="col-md-3">
                <StyledButton
                  variant="primary"
                  onClick={() => handleRequestItem(currentUser, item)}
                >
                  Request Item
                </StyledButton>
              </StyledContainer>
            ) : !currentUser ? 
            
            <StyledContainer $bgColor={true}>
              <div>
                Create an account to get started
              </div>
               
                </StyledContainer>
          : null
            }
          </div>
        </Card.Body>
      </StyledCard>
    )
  // }
}

export default ItemCard

const StyledCard = styled(Card)`
  width: 90%;
  max-height: 100% ;
  margin: 10px 0;
`
// organizes the text content of the item card
const TextContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  flex: 3;
`
// organizes the image content of the item card
const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  flex: 1;
`
const StyledImg = styled.img`
  width: initial;
`
// organizes the button alignment on the item card
const StyledContainer = styled.div<{ $bgColor?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  gap: 10px;
  flex: 1;
  background-color: ${props => props.$bgColor ? "whitesmoke" : "initial"};
  border-radius: 5px;
`
// standardizes the buttons on the card
const StyledButton = styled(Button)<any>`
  width: 150px;
  align-self: center;
`
