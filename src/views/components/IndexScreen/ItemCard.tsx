import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Item from '../../../models/Item'
import { handleRequestItem } from '../../../controllers/IndexScreen/requestItemController'
import useUserContext from '../../../controllers/context/userContext/useUserContext'
import { UserTypes } from '../../../../constants'
import useItemsContext from '../../../controllers/context/itemContext/useItemsContext'

interface IProps {
  item: Item
  setErrorMsg: (msg: string) => void
  setSuccessMsg: (msg: string) => void
}

const ItemCard = ({ item, setErrorMsg, setSuccessMsg }: IProps) => {
  const { currentUser } = useUserContext()
  const itemsSubject = useItemsContext()

  const addedAtTimeStamp = new Date(item.addedAtTimeStamp ?? new Date())
  const day = addedAtTimeStamp.getDate()
  const month = addedAtTimeStamp.getMonth() + 1 // Months are zero-based, so add 1
  const year = addedAtTimeStamp.getFullYear()

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
              <StyledImg src={item.image === 'default' || item.image === undefined ? 'https://placekitten.com/200/200' : item.image} />
            </ImgContainer>
            <TextContainer className="col-md-6 card-body">
             
                <Card.Title>Name: {item?.name}</Card.Title>
                <div className="card-text">Region: {item?.location?.toUpperCase()}</div>
                <div className="card-text">Description: {item?.description}</div>
                <div className="card-text">ITEM STATUS: {item?.itemState}</div>
                <div className="card-text">{item?.receiverId}</div>
                <div className="card-text">
                  <small className="text-muted">Date posted: </small>
                  <small className="text-muted">{`${day}-${month}-${year}`}</small>
              </div>
            </TextContainer>
            {/* if item is available (checked before this function call), and the user is a receiver, user can request item */}
            {currentUser?.userType === UserTypes.RECEIVER ? (
              <StyledContainer className="col-md-3">
                <StyledButton
                  variant="primary"
                  onClick={() => 
                    handleRequestItem({
                      currentUser, 
                      item, 
                      notify: itemsSubject?.notify,
                      setErrorMsg,
                      setSuccessMsg
                      })}>
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
 @media (max-width: 768px) {
  margin-top: 10px;
 }
  width: 150px;
  align-self: center;
`
