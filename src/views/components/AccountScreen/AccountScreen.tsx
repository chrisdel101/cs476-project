import styled from 'styled-components'
import useUserContext from '../../../controllers/context/userContext/useUserContext'
import { AppAlert as Alert } from '../Alert'
import { AlertTypes, Notifications, Observers, UserTypes } from '../../../../constants'
import UserAccountCard from './UserAccountCard'
import { useEffect, useState } from 'react'
import Item from '../../../models/Item'
import UpsertItemModal from '../IndexScreen/UpsertItemModal'
import useItemsContext from '../../../controllers/context/itemContext/useItemsContext'
import Observer from '../../../models/Observer'
import ItemFiltering from '../IndexScreen/ItemFiltering'; 
import Loading from '../Loading'

const Account = () => {
  const { currentUser } = useUserContext()
  const [userItems, setUserItems] = useState<Item[]>([])
  const [showUpsertItemModal, setShowUpsertItemModal] = useState<boolean>(false)
  const [successMsg, setSuccessMsg] = useState<string | undefined>(undefined)
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const handleCloseUpsertItemModal = () => setShowUpsertItemModal(false)
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined)
  const itemsSubject = useItemsContext()
  const [observer] = useState<Observer>(new Observer({id: Observers.ACCOUNT, 
    update: (newItems: Item[]) => {
    // Update the component's local items state
    setUserItems(newItems);
  }}))

  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedItemType, setSelectedItemType] = useState('all');
  const [selectedKeyword, setSearchKeyword] = useState('all');
  
  useEffect(() => {
    if (itemsSubject) {
      // attach to curent observer on
      itemsSubject.attach(observer);
    }
  },[itemsSubject, observer])

  useEffect(() => {
    if (itemsSubject) {
      // attach to curent observer on
      return () => {
        itemsSubject.detach(observer);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleItemTypeChange = (event) => {
    setSelectedItemType(event.target.value);
  };

  const handleSearch = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };


  useEffect(() => {
    // call notify on load for init paint  
    itemsSubject.notify(observer?.id, Notifications.GET_ITEMS_BY_USER, currentUser);
  // monitor array of observers for changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSubject.observersArr])

  return (
    <PageContainer $usertypecontainer={currentUser?.userType}>
      { !itemsSubject?.isLoaded ? 
        <Loading/> : 
       <>
       <AlertContainer>
        <Alert variant={AlertTypes.SUCCESS} message={successMsg} show={successMsg} setShow={setSuccessMsg} duration={6000}/>
        <Alert variant={AlertTypes.DANGER} message={errorMsg} show={errorMsg} setShow={setErrorMsg} duration={6000}/>
        
      </AlertContainer>
          <ItemFiltering
                selectedLocation={selectedLocation}
                handleLocationChange={handleLocationChange}
                selectedItemType={selectedItemType}
                handleItemTypeChange={handleItemTypeChange}
                items={userItems}
                onFilterSubmit={handleSearch}
                />   
          {currentUser ? (
            <UserAccountCard 
            userItems={userItems.filter((item) => {
              return (
                (selectedLocation === 'all' || item.location === selectedLocation) &&
                (selectedItemType === 'all' || item.itemType === selectedItemType) &&
                (selectedKeyword === 'all' || selectedKeyword === '' || 
                  item.description.toLowerCase().includes(selectedKeyword.toLowerCase()) || item.name.toLowerCase().includes(selectedKeyword.toLowerCase()))
              );
            })} 
            currentUser={currentUser} 
            setShowUpsertItemModal={setShowUpsertItemModal}
            setSelectedItem={setSelectedItem}
            setSuccessMsg={setSuccessMsg}
            setErrorMsg={setErrorMsg}
            />
          ) : (
            <Loading/>
          )}
        <UpsertItemModal
          show={showUpsertItemModal}
          handleClose={handleCloseUpsertItemModal}
          setSuccessMsg={setSuccessMsg}
          setErrorMsg={setErrorMsg}
          title={'Update An Item'}
          item={selectedItem}
          observerID={Observers.ACCOUNT}
      />
       </>
      } 
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
const AlertContainer = styled.div<{ $show?: string }>`
  padding-top: 10px;
  min-height: 110px;
`