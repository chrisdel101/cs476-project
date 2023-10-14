import styled from 'styled-components'
import useUserContext from '../../../controllers/context/useUserContext'

import { UserTypes } from '../../../../constants'
import UserAccountCard from './UserAccountCard'
import { useEffect, useState } from 'react'
import Item from '../../../models/Item'
import crudFunctions from '../../../api/crudFunctions'
import UpsertItemModal from '../IndexScreen/UpsertItemModal'

const Account = () => {
  const { currentUser } = useUserContext()
  const [userItems, setUserITems] = useState<Item[]>([])
  const [showUpsertItemModal, setShowUpsertItemModal] = useState<boolean>(false)
  const [successMsg, setSuccessMsg] = useState<string | undefined>(undefined)
  const handleCloseUpsertItemModal = () => setShowUpsertItemModal(false)
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined)

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const fetchedUserItems = await crudFunctions.getItemsByUser(currentUser)
        setUserITems(fetchedUserItems)
      }
    })()
  }, [currentUser])
  return (
    <PageContainer $usertypecontainer={currentUser?.userType}>
      {currentUser ? (
        <UserAccountCard 
        userItems={userItems} currentUser={currentUser} 
        setShowUpsertItemModal={setShowUpsertItemModal}
        setSelectedItem={setSelectedItem}
        />
      ) : (
        <div>Loading....</div>
      )}
    <UpsertItemModal
      show={showUpsertItemModal}
      handleClose={handleCloseUpsertItemModal}
      setSuccessMsg={setSuccessMsg}
      title={'Update An Item'}
      item={selectedItem}
  />
    </PageContainer>
  )
}

export default Account

const PageContainer = styled.div<{ $usertypecontainer?: UserTypes }>`
  background-color: ${(props) =>
    props.$usertypecontainer === UserTypes.DONOR ? 'powderblue' : 'salmon'};
  width: 100%;
  flex: 1;
`
