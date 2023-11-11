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
// Component displaying items on the IndexScreen
const ItemCard = ({ item, setErrorMsg, setSuccessMsg }: IProps) => {
  const { currentUser } = useUserContext()
  const itemsSubject = useItemsContext()

  const addedAtTimeStamp = new Date(item.addedAtTimeStamp ?? new Date())
  const day = addedAtTimeStamp.getDate()
  const month = addedAtTimeStamp.getMonth() + 1 // Months are zero-based, so add 1
  const year = addedAtTimeStamp.getFullYear()

  // template for the card contents
    return (
      // following the information at https://getbootstrap.com/docs/4.3/components/card/ but with the boostrap 5 card elements found at //https://react-bootstrap.netlify.app/docs/components/cards
      <StyledCard
        border="light">
        <StyledMobileCardBody className="row no-gutters">
            <ImgContainer className="col-md-3">
              {/* will need an image var here */}
              <StyledImg src={item.image === 'default' || item.image === undefined ? 'https://placekitten.com/200/200' : item.image} />
            </ImgContainer>
            <TextContainer className="col-md-6 card-body">
             
                <Card.Title>Name: {item?.name}</Card.Title>
                <div className="card-text">Region: {item?.location?.toUpperCase()}</div>
                <div className="card-text">Description: {item?.description}</div>
                <div className="card-text">ITEM STATUS: {item?.itemState}</div>
              
                <div className="card-text">
                  <small className="text-muted">Date posted: </small>
                  <small className="text-muted">{`${day}-${month}-${year}`}</small>
              </div>
            </TextContainer>
            {/* if item is available (checked before this function call), and the user is a receiver, user can request item */}
            {currentUser?.userType === UserTypes.RECEIVER ? (
              <StyledButtonContainer className="col-md-3">
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
              </StyledButtonContainer>
            ) : !currentUser ? 
            
            <StyledButtonContainer $bgColor={true}>
              <div>
                Create an account to get started
              </div>
               
                </StyledButtonContainer>
          : null
            }
        </StyledMobileCardBody>
      </StyledCard>
    )
}

export default ItemCard

const StyledMobileCardBody = styled(Card.Body)`
  @media (max-width: 609px) {
    flex-direction: column;
  }
  flex-direction: row;
`

const StyledCard = styled(Card)`
  width: 90%;
  max-height: 100% ;
  margin: 10px 0;
`
// organizes the text content of the item card
const TextContainer = styled.div`
@media (max-width: 768px) {
  flex: 2;
 }
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  flex: 3;
`
// organizes the image content of the item card
const ImgContainer = styled.div`
  @media (max-width: 768px) {
    width: 50%;
    margin: auto;
  }
  @media (max-width: 460px) {
    width: 90%;
    margin: auto;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  flex: 1;
  width: 150px;
  max-height: 150px;
`
const StyledImg = styled.img`
  object-fit: cover;
`
// organizes the button alignment on the item card
const StyledButtonContainer = styled.div<{ $bgColor?: boolean }>`
  @media (max-width: 609px) {
    min-height: 100px;
    justify-content: center;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // only applies when button showing
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  flex: 1;
  background-color: whitesmoke;
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
