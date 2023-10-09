import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import AddUserModal from './AddUserModal'
import { useState } from 'react'
import { AlertTypes } from '../../../../constants'
import AddItemModal from './AddItemModal'
import crudFunctions from '../../../api/crudFunctions'
import { AppAlert as Alert }  from '../Alert'

const Index = () => {
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false)
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string|undefined>(undefined)
  const [successMsg, setSuccessMsg] = useState<string|undefined>(undefined)

  const handleCloseAddUserModal = () => setShowAddUserModal(false)
  const handleShowAddUserModal = () => setShowAddUserModal(true)
  const handleCloseAddItemModal = () => setShowAddItemModal(false)
  const handleShowAddItemModal = () => setShowAddItemModal(true)


  return (
    <PageContainer>
      <Alert variant={AlertTypes.SUCCESS} message={successMsg} />

      <SytledButton variant="primary" onClick={crudFunctions.testAddNewUser}>
       Test Add
      </SytledButton>
      <SytledButton variant="primary" onClick={handleShowAddUserModal}>
       Create An Account
      </SytledButton>
      <SytledButton variant="primary" onClick={handleShowAddItemModal}>
       Create An Item
      </SytledButton>
      <div className="demo-container" style={{display: "flex", justifyContent: "space-evenly"}}>
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
      <AddItemModal show={showAddItemModal} handleClose={handleCloseAddItemModal} />
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
const SytledButton = styled(Button)<any>`
    width: 200px;
    align-self: center;
`
