import styled from 'styled-components'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Item from '../../../models/Item';
import { Locations } from '../../../../constants';
import { ItemTypes } from '../../../../constants';
import { ItemStates } from '../../../../constants'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import {handleRequestItem} from '../../../controllers/IndexScreen/requestItemController';
import useUserContext from '../../../controllers/context/useUserContext';

interface IProps {
    item: Item
}

const ItemCard = ({item}: IProps) => {
    const {currentUser} = useUserContext();

    const addedAtTimeStamp = new Date(item.addedAtTimeStamp);
    const day  = addedAtTimeStamp.getDate()
    const month = addedAtTimeStamp.getMonth() + 1 // Months are zero-based, so add 1
    const year = addedAtTimeStamp.getFullYear()
    const hour = addedAtTimeStamp.getHours()
    const minute = addedAtTimeStamp.getMinutes()

    // generate a basic one for testing
    // const item1 = new Item({donorId:"KG9fbpszbveuz2kTmNwZUJraR1J3", name: "A shirt", description: "A yellow t-shirt, good condition, from pet-free home.", location: Locations.REGINA, itemType: ItemTypes.CLOTHING})

    // template for the card contents
    if (currentUser) {
        return (

        // first attempt that suits a vertical style from //https://react-bootstrap.netlify.app/docs/components/cards, this got really messy on wide screens and the item cards were too tall
        // <Card border="light" style={{ width: '23%' }}>
        //     <Card.Img variant="top" src='https://placekitten.com/200/200' /> 
        //     <Card.Body>
        //         <Card.Title>{item1.name}</Card.Title>
        //         <Card.Text>
        //             {/* <div>{item1.itemType}</div> */}
        //             <div>{item1.description}</div>
        //         </Card.Text>
        //         <Button variant="primary">Accept Request</Button>
        //         <Button variant="primary">Deny Request</Button>
        //   </Card.Body>
        // </Card>

        // second attempt fiddling with my own solution that suits a horizontal style - this works well until the screen gets pretty small, so we might need to utilize both the horizontal and the vertical style?
        // <Card border="light" style={{ width: '90%' }}>
        //     <Card.Body>
        //         <Row>
        //             <Col style={{flex:1}}>
        //                 {/* will need an image var here */}
        //                 <img src={'https://placekitten.com/200/200'} /> 
        //             </Col>
        //             <Col style={{flex:2}}>
        //                 <Row style={{height:'auto'}}>
        //                     <Card.Title>{item1.name}</Card.Title>
        //                     <div>{item1.itemType}</div>
        //                     <div>{item1.description}</div>
        //                 </Row>
        //                 <Row style={{height:'100px', width: '320px', flex:'end'}}>
        //                     <Col><Button variant="primary">Accept Request</Button></Col>
        //                     <Col><Button variant="primary">Deny Request</Button></Col>
        //                 </Row>
        //             </Col>
        //         </Row>
        //     </Card.Body>
        // </Card>

        // third attempt, following the information at https://getbootstrap.com/docs/4.3/components/card/ but with the boostrap 5 card elements found at //https://react-bootstrap.netlify.app/docs/components/cards
            <Card border='light' style={{ width: '90%', maxHeight: '100%', margin:'10px 0' }}>
                <Card.Body>
                    <div className="row no-gutters">
                        <ImgContainer className="col-md-3">
                            {/* will need an image var here */}
                            <img src={'https://placekitten.com/200/200'} /> 
                        </ImgContainer>
                        <TextContainer className="col-md-6">
                            <div className="card-body">
                                <Card.Title>{item?.name}</Card.Title>
                                <p className="card-text">{item?.description}</p>
                                <p className="card-text">{item?.itemState}</p>
                                <p className="card-text">{item?.receiverId}</p>
                                <p className="card-text">
                                    <small className="text-muted">Date posted: </small>
                                    <small className="text-muted">{`${day}-${month}-${year} ${hour}:${minute}`}</small>
                                </p>
                            </div>
                        </TextContainer>
                        {/* if item is available (checked before this function call), and the user is a receiver, user can request item */}
                        {currentUser.userType === "receiver" ?
                            <ButtonContainer className='col-md-3'>
                                <StyledButton variant="primary" onClick={()=> handleRequestItem(currentUser, item)}>
                                    Request Item
                                </StyledButton>
                            </ButtonContainer>
                            : null
                        }
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default ItemCard;

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
// organizes the button alignment on the item card
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    gap: 10px;
    flex: 1;
`
// standardizes the buttons on the card
const StyledButton = styled(Button)<any>`
  width: 150px;
  align-self: center;
`