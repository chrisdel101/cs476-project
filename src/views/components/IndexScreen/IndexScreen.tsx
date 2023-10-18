import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import AddUserModal from './AddUserModal'
import { useEffect, useState } from 'react'
import { AlertTypes, ItemStates, UserTypes } from '../../../../constants'
import UpsertItemModal from './UpsertItemModal'
import crudFunctions from '../../../api/crudFunctions'
import { AppAlert as Alert } from '../Alert'
import useUserContext from '../../../controllers/context/userContext/useUserContext'
import Item from '../../../models/Item'
import ItemCard from './ItemCard'
import Row from 'react-bootstrap/Row';
import useItemsContext from '../../../controllers/context/itemContext/useItemsContext'
import { Observer } from '../../../controllers/context/itemContext/itemProvider'

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
  const itemsSubject = useItemsContext()
  const [items, setItems] = useState<Item[]>([])

  // attach all observers
  const observer: Observer = {
    id: 'IndexObserver',
    update: (newItems) => {
      // Update the component's local items state
      setItems(newItems);
    },
  };
  useEffect(() => {
    console.log('items in index', items)
    // build observers - this can be class
    if (itemsSubject) {
      // attach to curent observer
      itemsSubject.attach(observer);

      // return () => {
      //   itemsSubject.detach(observer);
      // };
    }
  }, [items]);

  useEffect(() => { 
    itemsSubject.notify(observer);
  })

  // useEffect(() => {
  //   (async () => {
  //     // fetch items test
  //       const fetchItems = await crudFunctions.getItems()
  //       setItems(fetchItems)
  //   })()
  // }, [])
  return (
    <PageContainer>
      <Alert variant={AlertTypes.SUCCESS} message={successMsg} show={successMsg} setShow={setSuccessMsg} duration={6000}/>

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

      <CardsContainer className='card-container'>
        {items.length === 0 ? (
        <div>No Items</div>
        ) : (
          items.map((item, i) => {
            if (item.itemState === ItemStates.AVAILABLE) {
              return (
                  <ItemCard key={i} item={item}/>        
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
  margin-top: 2em;
  justify-content: center;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// disable required for this styled component only
const StyledButton = styled(Button)<any>`
  width: 200px;
  align-self: center;
`
