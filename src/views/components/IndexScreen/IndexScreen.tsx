import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import AddUserModal from './AddUserModal'
import { useEffect, useState } from 'react'
import { AlertTypes, ItemStates, UserTypes } from '../../../../constants'
import AddItemModal from './AddItemModal'
import crudFunctions from '../../../api/crudFunctions'
import { AppAlert as Alert } from '../Alert'
import useUserContext from '../../../controllers/context/useUserContext'
import Item from '../../../models/Item'
import { handleRequestItem } from '../../../controllers/IndexScreen/requestItemController'
import ItemCard from './ItemCard'

const Index = () => {
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false)
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [successMsg, setSuccessMsg] = useState<string | undefined>(undefined)
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
        console.log(items)
    })()
  }, [])
  return (
    <PageContainer>
      <Alert variant={AlertTypes.SUCCESS} message={successMsg} />

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

      <div
        className="demo-container"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        {items.length === 0 ? (
        <div>No Items</div>
      ) : (
        items.map((item, i) => {
          if (item.itemState === ItemStates.AVAILABLE) {
            return (
              <div key={i} style={{ border: '1px solid black', backgroundColor: 'white', margin: '0 5px' }}>
                <h1>Item {i}</h1>
                <p>Item Name: {item?.name}</p>
                <p>Item Donor: {item?.donorId}</p>
                <p>Item Donor: {item?.itemState}</p>
                {currentUser?.userType === UserTypes.RECEIVER ? (
                  <Button onClick={() => handleRequestItem(currentUser, item)}>Request item</Button>
                ) : null}
              </div>
            );
          } else {
            return null;
          }
        })
      )}
        
      </div>
      <AddUserModal
        show={showAddUserModal}
        handleClose={handleCloseAddUserModal}
        setSuccessMsg={setSuccessMsg}
      />
      <AddItemModal
        show={showAddItemModal}
        handleClose={handleCloseAddItemModal}
        setSuccessMsg={setSuccessMsg}
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// disable required for this styled component only
const StyledButton = styled(Button)<any>`
  width: 200px;
  align-self: center;
`
