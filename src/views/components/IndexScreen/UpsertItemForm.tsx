import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { ItemTypes, Locations, Notifications, Observers } from '../../../../constants'
import useUserContext from '../../../controllers/context/userContext/useUserContext'
import { handleSubmit } from '../../../controllers/IndexScreen/addItemController'
import { useState } from 'react'
import Item from '../../../models/Item'
import useItemsContext from '../../../controllers/context/itemContext/useItemsContext'
import { useRef } from 'react'
interface IForm {
  handleCloseAddItemModal: () => void;
  setSuccessMsg: (str: string|undefined) => void;
  setErrorMsg: (str: string|undefined) => void;
  observerID: Observers
  item?: Item
}
const UpsertItemForm = ({handleCloseAddItemModal, setSuccessMsg, setErrorMsg, item, observerID}: IForm) => {
  const [validated, setValidated] = useState(false)
  
  const [name, setName] = useState<string>(item?.name || '')
  const [desc, setDesc] = useState<string>(item?.description || '')
  const [location, setLocation] = useState<string>(item?.location || '')
  const [pickupAddress, setPickupAddress] = useState<string>(item?.pickupAddress || '')
  const [itemType, setItemType] = useState<string>(item?.itemType || '')
  const { notify } = useItemsContext()

  const {currentUser} = useUserContext();

  const imageUploaded = useRef(null);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [fileValidationError, setFileValidationError] = useState('');
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0 && files[0].type.startsWith('image/')) {
      setFileValidationError('');
      setSelectedImage(files[0]);
    } else {
      
      setFileValidationError('Not an image file');
      e.target.value = null;
    }
  };
  return (
    <Form
      noValidate
      validated={validated}
      className="add-item-form"
      onSubmit={(e) => 
        handleSubmit({
          e,
          setValidated,
          handleCloseAddItemModal,
          setSuccessMsg,
          setErrorMsg,
          currentUser,
          item,
          notify,
          observerID, 
          notifcationType: item ? Notifications.GET_ITEMS_BY_USER : Notifications.GET_ITEMS,
          imageFile: selectedImage,
        })}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control required  name="item-name" placeholder="Enter Item Name" onChange={(e) => setName(e.target.value)} value={name}/> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          name="description"
          placeholder="Add Item Description"
          onChange={(e) => setDesc(e.target.value)}  value={desc}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Location</Form.Label>
        <Form.Select required name="location" onChange={(e) => setLocation(e.target.value)}  value={location}>
          {Object.values(Locations).map((location: string, i: number) => {
            return <option key={i}>{location}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicitemCategorySelect">
        <Form.Label>Item Category</Form.Label>
        <Form.Select required name="category" onChange={(e) => setItemType(e.target.value)} value={itemType}>
          {Object.values(ItemTypes).map((category: string, i: number) => {
            return <option key={i}>{category}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPickupAddress">
        <Form.Label>Pickup Address</Form.Label>
        <Form.Control 
          required
          name="pickup-address"
          placeholder="Add Pickup Address"
          onChange={(e) => setPickupAddress(e.target.value)}  value={pickupAddress} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUploadImage">
        <div><Form.Label>Upload Image</Form.Label></div>
        <label className="custom-file-upload">
          <input
          type="file"
          name="image-upload"
          accept="image/*"
          ref={imageUploaded}
          onChange={handleImageChange}
          />
          </label>
          <span className="error-message" style={{ color: 'red' }}>{fileValidationError}</span>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default UpsertItemForm
