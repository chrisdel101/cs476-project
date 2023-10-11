import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import AddUserModal from './AddUserModal'
import { useEffect, useState } from 'react'
import { AlertTypes, UserTypes } from '../../../../constants'
import AddItemModal from './AddItemModal'
import crudFunctions from '../../../api/crudFunctions'
import { AppAlert as Alert } from '../Alert'
import useUserContext from '../../../controllers/context/useUserContext'

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


  useEffect(() => {
    (async () => {
      // fetch items test
        const items = await crudFunctions.getItems()
        console.log(items)
        // TODO: store in hook
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
        {
          // some space fillers - to be replaced
          Array.from(Array(3)).map((_, i) => {
            return (
              <div key={i} style={{ border: '5px white solid' }}>
                <img src={'https://placekitten.com/200/200'} />
              </div>
            )
          })
        }
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
  height: 100%;
  width: 100%;
`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// disable required for this styled component only
const StyledButton = styled(Button)<any>`
  width: 200px;
  align-self: center;
`
