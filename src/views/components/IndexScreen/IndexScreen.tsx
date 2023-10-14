import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import AddUserModal from './AddUserModal'
import { useEffect, useState } from 'react'
import { AlertTypes, ItemStates, UserTypes } from '../../../../constants'
import UpsertItemModal from './UpsertItemModal'
import crudFunctions from '../../../api/crudFunctions'
import { AppAlert as Alert } from '../Alert'
import useUserContext from '../../../controllers/context/useUserContext'
import Item from '../../../models/Item'
import { handleRequestItem } from '../../../controllers/IndexScreen/requestItemController'
import ItemCard from './ItemCard'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Index = () => {
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false)
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [successMsg, setSuccessMsg] = useState<string | undefined>("")
  const { isLoggedIn, currentUser } = useUserContext()

  const handleCloseAddUserModal = () => setShowAddUserModal(false)
  const handleShowAddUserModal = () => setShowAddUserModal(true)
  const handleCloseAddItemModal = () => setShowAddItemModal(false)
  const handleShowAddItemModal = () => setShowAddItemModal(true)
  const [items, setItems] = useState<Item[]>([])


  useEffect(() => {
    (async () => {
      // fetch items test
        const fetchItems = await crudFunctions.getItems()
        setItems(fetchItems)
    })()
  }, [])
  return (
    <PageContainer>
      <Alert variant={AlertTypes.SUCCESS} message={successMsg} show={!!successMsg} setShow={setSuccessMsg} duration={6000}/>

      {isLoggedIn ? null : (
        <StyledButton variant="primary" onClick={handleShowAddUserModal}>
          Create An Account
        </StyledButton>
      )}
      {isLoggedIn && currentUser?.userType === UserTypes.DONOR ? (
       <StyledButton variant="primary" onClick={handleShowAddItemModal}>
       Donate An Item
     </StyledButton>
      ) : null}

      {/* NEED TO FIX THE FORMATTING ON THIS */}
      <CardsContainer className='card-container'>
        {items.length === 0 ? (
        <div>No Items</div>
        ) : (
          items.map((item, i) => {
            if (item.itemState === ItemStates.AVAILABLE) {
              return (
                <Col xs={12} key={i}>
                  <ItemCard item={item}/>
                </Col>
        
        // dummy cards
        // <div
        //   className="demo-container"
        //   style={{ display: 'flex', justifyContent: 'space-evenly' }}
        // >
        //   {items.length === 0 ? (
        //   <div>No Items</div>
        // ) : (
        //   items.map((item, i) => {
        //     if (item.itemState === ItemStates.AVAILABLE) {
        //       return (
          // items.map((item, i) => {
          //   if (item.itemState === ItemStates.AVAILABLE) {
          //     return (
          //       <div key={i} style={{ border: '1px solid black', backgroundColor: 'white', margin: '0 5px' }}>
          //         <h1>Item {i}</h1>
          //         <p>Item Name: {item?.name}</p>
          //         <p>Item Donor: {item?.donorId}</p>
          //         <p>Item Donor: {item?.itemState}</p>
          //         {currentUser?.userType === UserTypes.RECEIVER ? (
          //           <Button onClick={() => handleRequestItem(currentUser, item)}>Request item</Button>
          //         ) : null}
          //       </div>
              );
            } else {
              return null;
            }
          })
        )}
      </CardsContainer>
      
      <AddUserModal
        show={showAddUserModal}
        handleClose={handleCloseAddUserModal}
        setSuccessMsg={setSuccessMsg}
      />
      <UpsertItemModal
        show={showAddItemModal}
        handleClose={handleCloseAddItemModal}
        setSuccessMsg={setSuccessMsg}
        title={'Donate An Item'}
      />
    </PageContainer>
  )
}
export default Index

const PageContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  background-color: blue;
  width: 100%;
`

// stacks cards in a row
const CardsContainer = styled(Row)`
  flex-direction: column;
  margin-top: 2em;
  justify-content: center;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// disable required for this styled component only
const StyledButton = styled(Button)<any>`
  width: 200px;
  align-self: center;
`
