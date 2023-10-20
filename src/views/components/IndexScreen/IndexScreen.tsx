import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import AddUserModal from './AddUserModal'
import { useEffect, useState } from 'react'
import { AlertTypes, ItemStates, UserTypes, Observers, Notifications } from '../../../../constants'
import UpsertItemModal from './UpsertItemModal'
import { AppAlert as Alert } from '../Alert'
import useUserContext from '../../../controllers/context/userContext/useUserContext'
import Item from '../../../models/Item'
import Observer from '../../../models/Observer'
import ItemCard from './ItemCard'
import Row from 'react-bootstrap/Row';
import useItemsContext from '../../../controllers/context/itemContext/useItemsContext'
import Loading from '../Loading'

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

  const [observer] = useState<Observer>(new Observer({id: Observers.INDEX, 
    update: (newItems: Item[]) => {
    // Update the component's local items state
    setItems(newItems);
  }}))
  const itemsSubject = useItemsContext()
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    // build observers - this can be class
    if (itemsSubject) {
      // attach to curent observer on
      itemsSubject.attach(observer);
      // run this when component unmoounts
      return () => {
        itemsSubject.detach(observer);
      };
    }
  }, []);

  useEffect(() => {
    // call notify on load for init paint  
    itemsSubject.notify(observer?.id, Notifications.GET_ITEMS);
  // make sure observersArr state is udated before notify called 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSubject.observersArr])

  return (
    <PageContainer>
      <Alert variant={AlertTypes.SUCCESS} message={successMsg} show={successMsg} setShow={setSuccessMsg} duration={6000}/>
      { !itemsSubject?.isLoaded ? <Loading/> : 
        <>
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
            <h2>No Items</h2>
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
            observerID={Observers.INDEX}
          />
          
        </>
      }
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
  display: flex;
  text-align: center;
  justify-content: center;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// disable required for this styled component only
const StyledButton = styled(Button)<any>`
  width: 200px;
  align-self: center;
`
