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
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

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

  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedItemType, setSelectedItemType] = useState('all');

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleItemTypeChange = (event) => {
    setSelectedItemType(event.target.value);
  };

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
          {isLoggedIn && currentUser?.userType === UserTypes.RECEIVER ? (
            <Row>
            {/* Empty row for spacing */}
            ""
            </Row>
          ) : null }
          {isLoggedIn && currentUser?.userType === UserTypes.RECEIVER ? (
          <Row>
            <Col>
            <Form.Select value={selectedLocation} onChange={handleLocationChange}>
            <option value="all">All Locations</option>
              {(() => {
                const uniqueLocations = new Set();

                items.forEach((item) => {
                uniqueLocations.add(item.location);
                });

                if (items.length === 0 || uniqueLocations.size === 0) {
                  return null;
                }

                return Array.from(uniqueLocations).map((location, i) => (
                  <option key={i} value={location}>
                    {location}
                  </option>
                    ));
                  })()
                }
            </Form.Select>
            </Col>
            <Col>
            <Form.Select value={selectedItemType} onChange={handleItemTypeChange}>
              <option value="all">All Item Types</option>
              {(() => {
                const uniqueItemTypes = new Set();

                items.forEach((item) => {
                uniqueItemTypes.add(item.itemType);
                });

                if (items.length === 0 || uniqueItemTypes.size === 0) {
                  return null;
                }

                return Array.from(uniqueItemTypes).map((itemType, i) => (
                  <option key={i} value={itemType}>
                    {itemType}
                  </option>
                    ));
                  })()
                }
            </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option value="all">All Keywords</option>
              </Form.Select>
            </Col>
          </Row>
          ) : null}
          <CardsContainer className='card-container'>
            {items.length === 0 ? (
            <h2>No Items</h2>
            ) : (
              items.map((item, i) => {
                if (item.itemState === ItemStates.AVAILABLE) {
                  if (
                    (selectedLocation === 'all' || item.location === selectedLocation) &&
                    (selectedItemType === 'all' || item.itemType === selectedItemType)
                    ) {
                      return (
                        <ItemCard key={i} item={item}/>        
                      );
                    }
                    else {
                      return null;
                    }
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
