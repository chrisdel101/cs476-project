import styled from 'styled-components'
import useUserContext from '../../../controllers/context/userContext/useUserContext'

import { Notifications, Observers, UserTypes } from '../../../../constants'
import UserAccountCard from './UserAccountCard'
import { useEffect, useState } from 'react'
import Item from '../../../models/Item'
import crudFunctions from '../../../api/crudFunctions'
import UpsertItemModal from '../IndexScreen/UpsertItemModal'
import useItemsContext from '../../../controllers/context/itemContext/useItemsContext'
import Observer from '../../../models/Observer'

const Account = () => {
  const { currentUser } = useUserContext()
  const [userItems, setUserItems] = useState<Item[]>([])
  const [showUpsertItemModal, setShowUpsertItemModal] = useState<boolean>(false)
  const [successMsg, setSuccessMsg] = useState<string | undefined>(undefined)
  const handleCloseUpsertItemModal = () => setShowUpsertItemModal(false)
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined)
  const itemsSubject = useItemsContext()
  const [observer] = useState<Observer>(new Observer({id: Observers.ACCOUNT, 
    update: (newItems: Item[]) => {
    // Update the component's local items state
    setUserItems(newItems);
  }}))
  
  useEffect(() => {
    if (itemsSubject) {
      // attach to curent observer on
      itemsSubject.attach(observer);
      console.log('itemsSubject', itemsSubject)
      // return () => {
      //   itemsSubject.detach(observer);
      // };
    }
  })


  useEffect(() => {
    // call notify on load for init paint  
    itemsSubject.notify(observer?.id, Notifications.GET_ITEMS_BY_USER, currentUser);
  // monitor array of observers for changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSubject.observersArr])

  return (
    <PageContainer $usertypecontainer={currentUser?.userType}>
      {currentUser ? (
        <UserAccountCard 
        userItems={userItems} 
        currentUser={currentUser} 
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
      observerID={Observers.ACCOUNT}
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
